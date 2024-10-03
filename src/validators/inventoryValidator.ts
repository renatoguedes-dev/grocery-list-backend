import { body, param } from "express-validator";

export const validateAddItem = [
  // Validate and sanitize name
  body("item").trim().notEmpty().withMessage("Please provide the item."),

  // validate and sanitize date
  body("currentAmount")
    .notEmpty()
    .withMessage("Please provide the current amount.")
    .isInt({ min: 0 })
    .withMessage("currentAmount must be a positive integer or 0"),

  body("minimumAmount")
    .notEmpty()
    .withMessage("Please provide the minimum amount.")
    .isInt({ min: 0 })
    .withMessage("minimumAmount must be a positive integer or 0"),
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
    .isInt({ min: 0 })
    .withMessage("currentAmount must be a positive integer or 0"),

  body("minimumAmount")
    .notEmpty()
    .withMessage("Please provide the minimum amount.")
    .isInt({ min: 0 })
    .withMessage("minimumAmount must be a positive integer or 0"),
];

export const validateDeleteItem = [
  body("itemId")
    .trim()
    .notEmpty()
    .withMessage("Please provide the itemId.")
    .isUUID()
    .withMessage("itemId must be a valid UUID"),
];
