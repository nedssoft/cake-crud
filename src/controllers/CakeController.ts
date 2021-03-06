import { Response, Request } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { Cake } from '../database/models/cake.model';
import BaseController from './BaseController';

export default class CakeController extends BaseController {
  constructor() {
    super();
  }

/**
 * list all cakes
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 * @memberof CakeController
 */
async listCakes(req: Request, res: Response) {
    const cakes = (await this.models.Cake.findAll({
      order: [['createdAt', 'DESC']],
    })) as Cake[];
    return this.respondWithSuccess(res, '', cakes);
  }

/**
 * Create new cake instance
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 * @memberof CakeController
 */
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

/**
 * Get a single Cake object
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 * @memberof CakeController
 */
async getCakeDetails(req: Request, res: Response) {
    const { cake_id } = req.params;
    try {
      const cake = (await this.models.Cake.findByPk(cake_id)) as Cake;
      if (!cake) {
        return this.respondWithError(
          res,
          'Cake with specified ID does not exist',
          null,
          404,
        );
      }
      return this.respondWithSuccess(res, 'success', cake);
    } catch (err) {
      this.respondWithError(res, '', err);
    }
  }

  /**
   * Update a cake instance
   *
   * @param {Request} req
   * @param {Response} res
   * @returns 
   * @memberof CakeController
   */
  async updateCake(req: Request, res: Response) {
    const { cake_id } = req.params;
    try {
      const cake = (await this.models.Cake.findByPk(cake_id)) as Cake;
      if (!cake) {
        return this.respondWithError(
          res,
          'Cake with specified ID does not exist',
          null,
          404,
        );
      }
      const updatedCake = await cake.update(req.body);
      return this.respondWithSuccess(res, 'success', updatedCake);
    } catch (err) {
      this.respondWithError(res, '', err);
    }
  }

  /**
   * Delete a cake instance
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof CakeController
   */
  async deleteCake(req: Request, res: Response) {
    const { cake_id } = req.params;
    try {
      const cake = (await this.models.Cake.findByPk(cake_id)) as Cake;
      if (!cake) {
        return this.respondWithError(
          res,
          'Cake with specified ID does not exist',
          null,
          404,
        );
      }
      await cake.destroy();

      return this.respondWithSuccess(res, 'success');
    } catch (err) {
      this.respondWithError(res, '', err);
    }
  }
}
