import { Response, Request } from 'express';
import autoBind from 'auto-bind';

import { Cake } from '../database/models/cake.model';
import BaseController from './BaseController';

export default class CakeController extends BaseController {
  constructor() {
    super();
  }

  async listCakes(req: Request, res: Response) {
    const cakes = (await this.models.Cake.findAll({
      order: [['createdAt', 'DESC']],
    })) as Cake[];
    return this.respondWithSuccess(res, '', cakes);
  }

}
