const { body } = require('express-validator');

/**
 * Validation schema for registration endpoint
 * @docs https://express-validator.github.io/docs/index.html
 */

export const createCakeSchema = [
  body('name', 'name field is required').trim().notEmpty().isString(),
  body('comment', 'comment field is required')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 200 })
    .withMessage('The min length is 5 and max length is 200'),

  body('imageUrl', 'imageUrl field is required')
    .trim()
    .notEmpty()
    .isURL()
    .withMessage('The value must be a URL'),
  body('yumFactor', 'yumFactor field is required')
    .trim()
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('The value must be a number between 1 and 5'),
];
