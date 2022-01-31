import * as crypto from 'crypto';
import axios from 'axios';
import short from 'short-uuid';
import { byBit } from '../config';

export default class ByBitHelper {
  async getByBitServerTime() {
    try {
      const response = await this.request({
        url: 'v2/public/time',
        method: 'GET',
      });
      return response.time_now;
    } catch (err) {
      return null;
    }
  }
  async getTimeOffset() {
    const start = Date.now();
    const server_time = await this.getByBitServerTime();
    const end = Date.now();

    return Math.ceil(server_time * 1000 - end + (end - start) / 2);
  }

  async getTimestamp() {
    const timestamp = Date.now() + (await this.getTimeOffset());
    return timestamp;
  }

  async request({ url, method, data }: any) {
    try {
      const res = await axios({
        method,
        url: `${byBit.baseURL}/${url}`,
        ...(data && { data }),
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  serializeParams(params: any): string {
    return Object.keys(params)
      .sort()
      .map((key) => {
        const value = params[key];
        return `${key}=${value}`;
      })
      .join('&');
  }

  signMessage(message: string) {
    return crypto
      .createHmac('sha256', byBit.secret)
      .update(message)
      .digest('hex');
  }

  calculateTp(qty: number, percent: number, price: number): number {
    return Number(((percent / 100) * qty + price).toFixed(4));
  }

  generateLinkedId(linked: string) {
    return `${linked}_${short.generate()}`;
  }
}
