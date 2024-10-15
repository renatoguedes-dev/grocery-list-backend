import { body, param } from "express-validator";

export const validateAddItem = [
  // Validate and sanitize name
  body("item").trim().isLength({ min: 2, max: 50 }).withMessage("Please provide a valid item name."),

  // validate and sanitize date
  body("currentAmount")
    .notEmpty()
    .withMessage("Please provide the current amount.")
    .isInt({ min: 0, max: 99999 })
    .withMessage("currentAmount must be between 0 and 99999"),

  body("minimumAmount")
    .notEmpty()
    .withMessage("Please provide the minimum amount.")
    .isInt({ min: 0, max: 99999 })
    .withMessage("minimumAmount must be between 0 and 99999"),
];

export const validateUpdateItem = [
  param("itemId")
    .trim()
    .notEmpty()
    .withMessage("Please provide the itemId.")
    .isUUID()
    .withMessage("itemId must be a valid UUID"),

  body("currentAmount")
    .notEmpty()
    .withMessage("Please provide the current amount.")
    .isInt({ min: 0, max: 99999 })
    .withMessage("currentAmount must be between 0 and 99999"),

  body("minimumAmount")
    .notEmpty()
    .withMessage("Please provide the minimum amount.")
    .isInt({ min: 0, max: 99999 })
    .withMessage("minimumAmount must be between 0 and 99999"),
];

export const validateDeleteItem = [
  body("itemId")
    .trim()
    .notEmpty()
    .withMessage("Please provide the itemId.")
    .isUUID()
    .withMessage("itemId must be a valid UUID"),
];
