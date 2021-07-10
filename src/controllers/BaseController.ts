import { Response } from 'express';
import autoBind from 'auto-bind';
import { sequelize } from '../database/models';

export default class BaseController {
  protected models;
  constructor() {
    autoBind(this);
    this.models = sequelize.models;
  }

  /**
   *
   * @param {object} res
   * @param {string} message
   * Formats successful response
   */
  respondWithSuccess(
    res: Response,
    message: string | '',
    data?: any | null,
    statusCode?: number,
  ) {
    const _statusCode = statusCode || 200;
    const response = {
      status: 'success',
      statusCode: _statusCode,
      message,
      data: data || null,
    };
    return res.status(_statusCode).send(response);
  }

  /**
   *
   * @param {object} res
   * @param {string} message
   * Formats failed response
   */
  respondWithError(
    res: Response,
    message: string | '',
    error?: Error | any,
    statusCode?: number,
  ) {
    const _statusCode = statusCode || 500;
    let response = {
      status: 'error',
      statusCode: _statusCode,
      message:
        message || _statusCode === 500 ? 'internal server error' : message,
      data: error || null,
    };

    return res.status(_statusCode).send(response);
  }
}
