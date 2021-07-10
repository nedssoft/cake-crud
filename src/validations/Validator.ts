import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Validates request
 *
 * @author Chinedu Orie <nedsoftdeveloper@gmail.com>
 *
 * @export
 * @class Validator
 */
export default class Validator {
  
  /**
   * Takes in the validation schema and returns a nicely formatted error
   * Check validations/schema for sample schema
   *
   * @docs https://express-validator.github.io/docs/index.html
   * @static
   * @param {*} schemas - validation schema
   * @returns
   * @memberof Validator
   *
   */
  static validate(schemas: any[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(schemas.map((schema) => schema.run(req)));
      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = result.array({ onlyFirstError: true });
      return Validator.validationFailed(res, Validator.extractErrors(errors));
    };
  }

  /**
   *
   * @param {object} res
   * @param {object} errors
   * formats response caused due to form validation
   */
   static validationFailed(res: Response, errors: any) {
    const response = {
      status: 'error',
      error: errors,
      statusCode: 422,
      message: 'Validation failed',
    };
    return res.status(422).send(response);
  }

  /**
   *
   * @param {object} errors
   * processes the errors returned by the validator and puts it in required format
   */
  static extractErrors(errors: any[]) {
    const validationErrors: any = {};
    errors.forEach((error) => {
      validationErrors[error.param] = error.msg;
    });
    return validationErrors;
  }
}
