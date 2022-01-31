import { Response, Request } from 'express';
import short from 'short-uuid';
import { byBit } from '../config';
import ByBitHelper from '../util/bybit';
import BaseController from './BaseController';
import { Deal } from '../database/models/deal.model';
import { Order } from '../database/models/order.model';
const util = new ByBitHelper();

type TimeInForce =
  | 'GoodTillCancel'
  | 'ImmediateOrCancel'
  | 'FillOrKill'
  | 'PostOnly';
interface LinearOrderOptions {
  side: 'Buy' | 'Sell';
  symbol: string;
  order_type: 'Limit' | 'Market';
  qty: number;
  order_link_id?: string;
  time_in_force?: TimeInForce;
  price?: number;
}

interface SafetyOrderOptions extends Omit<LinearOrderOptions, 'time_in_force'> {
  exchange_uid?: string;
  deal_id: Deal['id'];
  pd: number;
}

interface SafetyOrdersOptions {
  base_price: number;
  safety_qty: number;
  safety_count: number;
  ss: number;
  pd: number;
  vs: number;
  symbol: string;
  deal_id: Deal['id'];
}

export default class OrderController extends BaseController {
  async createDeal(req: Request, res: Response): Promise<void> {
    const { symbol, base_qty, safety_qty, safety_count, ss, pd, vs, leverage } =
      req.body;
    try {
      if (leverage) {
        await this.setSymbolLeverage(symbol, leverage);
      }
      const deal = (await this.models.Deal.create({
        symbol,
        base_qty,
        safety_qty,
        safety_count,
        ss,
        pd,
        vs,
        leverage,
      })) as Deal;
      if (deal) {
        const base_order_res = await this.createLinearOrder({
          side: 'Buy',
          qty: base_qty,
          symbol,
          order_type: 'Market',
          order_link_id: util.generateLinkedId(`${deal.id}_0`),
        });
        if (base_order_res) {
          const base_order = (await this.saveSafetyOrder({
            side: 'Buy',
            qty: base_qty,
            symbol,
            order_type: 'Market',
            order_link_id: base_order_res.order_link_id,
            exchange_uid: base_order_res.order_id,
            deal_id: deal.id,
            pd: 0,
          })) as Order;
          const [position] = await this.getLinearPosition(symbol);
          if (position) {
            await base_order.update({
              price: position.entry_price,
              status: 'filled',
            });
            await this.createSafetyOrders({
              base_price: position.entry_price,
              safety_qty,
              safety_count,
              ss,
              pd,
              vs,
              symbol,
              deal_id: deal.id,
            });
          }
        }
      }
      res.send('OK');
    } catch (err: any) {
      console.log(err);
      res.send(err.message);
    }
  }
  async createOrder(req: Request, res: Response): Promise<void> {
    const {
      side,
      symbol,
      order_type,
      price,
      qty,
      time_in_force = 'GoodTillCancel',
      take_profit,
    } = req.body;
    try {
      const timestamp = await util.getTimestamp();
      const data = {
        api_key: byBit.apiKey,
        side,
        symbol,
        order_type,
        ...(price && { price }),
        qty,
        time_in_force,
        timestamp,
        ...(take_profit && { take_profit }),
        ...(order_type === 'Market' && {
          reduce_only: false,
          close_on_trigger: false,
        }),
      };
      const sign = util.signMessage(util.serializeParams(data));
      const payload = { ...data, sign };
      const response = await util.request({
        url: 'private/linear/order/create',
        data: payload,
        method: 'POST',
      });
      res.send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async createLinearOrder({
    side,
    symbol,
    order_type,
    qty,
    order_link_id,
    time_in_force = 'GoodTillCancel',
    price = 0,
  }: LinearOrderOptions) {
    try {
      const timestamp = await util.getTimestamp();
      const data = {
        api_key: byBit.apiKey,
        side,
        symbol,
        order_type,
        ...(price && { price: price.toFixed(2) }),
        qty,
        time_in_force,
        timestamp,
        ...(order_link_id && { order_link_id }),
        reduce_only: false,
        close_on_trigger: false,
      };
      const sign = util.signMessage(util.serializeParams(data));
      const payload = { ...data, sign };
      const res = await util.request({
        url: 'private/linear/order/create',
        data: payload,
        method: 'POST',
      });
      if (res.ret_code == 0 && res.ret_msg == 'OK') {
        return res.result;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getActiveOrder(req: Request, res: Response): Promise<void> {
    const { symbol, order_id = null } = req.body;
    try {
      const response = await this.queryActiveOrder(symbol, order_id);
      res.send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async queryActiveOrder(symbol: string, order_id?: Order['exchange_uid']) {
    const timestamp = await util.getTimestamp();
    const payload = {
      api_key: byBit.apiKey,
      symbol,
      timestamp,
      ...(order_id && { order_id }),
    };
    const serializeParams = util.serializeParams(payload);
    const sign = util.signMessage(serializeParams);
    const data = util.serializeParams({ ...payload, sign });
    const url = `private/linear/order/search?${data}`;
    const response = await util.request({ method: 'GET', url });
    if (response.ret_msg === 'OK') {
      return response.result;
    } else {
      return null;
    }
  }
  async getPosition(req: Request, res: Response): Promise<void> {
    const { symbol } = req.body;
    try {
      const response = await this.getLinearPosition(symbol);
      res.send(response.result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getLinearPosition(symbol: string): Promise<any> {
    const timestamp = await util.getTimestamp();
    const payload = {
      api_key: byBit.apiKey,
      symbol,
      timestamp,
    };
    const serializeParams = util.serializeParams(payload);
    const sign = util.signMessage(serializeParams);
    const data = util.serializeParams({ ...payload, sign });
    const url = `private/linear/position/list?${data}`;
    const res = await util.request({ method: 'GET', url });
    if (res && res.ret_msg == 'OK') return res.result;
    return null;
  }

  async setLeverage(req: Request, res: Response) {
    const { symbol, leverage } = req.body;
    try {
      const response = await this.setSymbolLeverage(symbol, leverage);
      res.send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async setSymbolLeverage(symbol: string, leverage: number): Promise<any> {
    const timestamp = await util.getTimestamp();
    const payload = {
      api_key: byBit.apiKey,
      symbol,
      buy_leverage: leverage,
      sell_leverage: leverage,
      timestamp,
    };
    const serializeParams = util.serializeParams(payload);
    const sign = util.signMessage(serializeParams);
    const data = util.serializeParams({ ...payload, sign });
    return util.request({
      url: '/private/linear/position/set-leverage',
      method: 'POST',
      data,
    });
  }

  async setTakeProfit(req: Request, res: Response) {
    try {
      const { take_profit, symbol, side } = req.body;
      const timestamp = await util.getTimestamp();
      const payload = {
        take_profit,
        symbol,
        side,
        timestamp,
        api_key: byBit.apiKey,
      };
      const serializeParams = util.serializeParams(payload);
      const sign = util.signMessage(serializeParams);
      const data = util.serializeParams({ ...payload, sign });
      const result = await util.request({
        url: 'private/linear/position/trading-stop',
        method: 'POST',
        data,
      });
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async saveSafetyOrder({
    deal_id,
    price,
    qty,
    side,
    order_type,
    exchange_uid,
    order_link_id,
    pd,
  }: SafetyOrderOptions) {
    return this.models.Order.create({
      deal_id,
      price,
      qty,
      side,
      order_type,
      exchange_uid,
      order_link_id,
      pd,
    });
  }

  async createSafetyOrders({
    base_price,
    safety_qty,
    safety_count,
    ss,
    pd,
    vs,
    symbol,
    deal_id,
  }: SafetyOrdersOptions) {
    let safety_order: Order;
    const s0_price = ((100 - pd) / 100) * base_price;
    const s0 = await this.createLinearOrder({
      side: 'Buy',
      symbol,
      order_type: 'Limit',
      qty: safety_qty,
      time_in_force: 'GoodTillCancel',
      price: s0_price,
      order_link_id: util.generateLinkedId(`${deal_id}_1`),
    });
    if (s0) {
      safety_order = (await this.saveSafetyOrder({
        deal_id,
        price: s0_price,
        order_link_id: s0.order_link_id,
        qty: safety_qty,
        side: 'Buy',
        order_type: 'Limit',
        exchange_uid: s0.order_id,
        symbol,
        pd,
      })) as Order;

      let link_id = 2;
      for (let i = 0; i < safety_count - 1; i++) {
        const order_link_id = util.generateLinkedId(
          `${deal_id}_${link_id + i}`,
        );
        const _qty = vs * safety_order.qty;
        const _pd = safety_order.pd * ss + pd;
        const _price = ((100 - _pd) / 100) * base_price;
        const _order = await this.createLinearOrder({
          side: 'Buy',
          symbol,
          order_type: 'Limit',
          qty: _qty,
          order_link_id,
          time_in_force: 'GoodTillCancel',
          price: _price,
        });
        if (_order) {
          safety_order = (await this.saveSafetyOrder({
            deal_id,
            price: _price,
            order_link_id,
            qty: _qty,
            side: 'Buy',
            order_type: 'Limit',
            symbol,
            pd: _pd,
            exchange_uid: _order.order_id,
          })) as Order;
        }
      }
    }
  }
  async updateTakeProfit(req: Request, res: Response) {
    try {
      const deals = (await this.models.Deal.findAll({
        where: { status: 'open' },
        include: [{ model: Order, as: 'orders' }],
      })) as Deal[];
      if (deals.length) {
        deals.forEach(async (deal) => {
          const orders = deal.orders;
          const filledOrders = orders.filter(
            (order) => order.status === 'filled',
          );
          const newOrders = orders.filter((order) => order.status === 'new');
          const [next, ...restOrders] = newOrders;
          const _order = await this.queryActiveOrder(
            deal.symbol,
            next.exchange_uid,
          );
          console.log({ next, _order });
          if (_order && _order.order_status === 'filled') {
            next.update({ status: 'filled' });
            filledOrders.push(next);
            // calculate TP for the once filled
          }
        });
      }
      res.send(deals);
    } catch (err) {}
  }
}
