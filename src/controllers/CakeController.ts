import { Response, Request } from 'express';
import { Sequelize } from 'sequelize-typescript';

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

  async createCake(req: Request, res: Response) {
    const { name, comment, imageUrl, yumFactor } = req.body;

    try {
      const cake = (await this.models.Cake.findOne({
        where: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('name')),
          Sequelize.fn('lower', name),
        ),
      })) as Cake;
      if (cake) {
        return this.respondWithError(
          res,
          'A cake with the specified name already exists',
          null,
          409,
        );
      }
      const newCake = (await this.models.Cake.create({
        name,
        comment,
        imageUrl,
        yumFactor,
      })) as Cake;
      if (newCake) {
        return this.respondWithSuccess(res, '', newCake, 201);
      }
      return this.respondWithError(
        res,
        'An error occurred creating the cake record',
      );
    } catch (err) {
      this.respondWithError(res, '', err);
    }
  }

  async getCakeDetails(req: Request, res: Response) {

    const { cake_id } = req.params;
    try {
      const cake = await this.models.Cake.findByPk(cake_id) as Cake;
      if(!cake) {
        return this.respondWithError(res, 'Cake with specified ID does not exist', null, 404);
      }
      return this.respondWithSuccess(res, 'success', cake);
    } catch (err) {
      
    }
  }
}
