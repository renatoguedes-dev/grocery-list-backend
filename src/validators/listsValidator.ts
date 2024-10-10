import { body, param } from "express-validator";

export const validateAddCustomList = [
  body("name").trim().notEmpty().withMessage("Please provide the list name."),

  body("date")
    .trim()
    .isISO8601()
    .notEmpty()
    .withMessage("Please provide the list's date."),
];

export const validateGetListById = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("ID cannot be empty")
    .isUUID()
    .withMessage("ID must be a valid UUID"),
];

export const validateDeleteList = [
  body("id")
    .trim()
    .notEmpty()
    .withMessage("ID cannot be empty")
    .isUUID()
    .withMessage("ID must be a valid UUID"),
];

export const validateAddListItem = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("ID cannot be empty")
    .isUUID()
    .withMessage("ID must be a valid UUID"),

  body("name").trim().notEmpty().withMessage("Please provide the item name."),

  body("amount")
    .notEmpty()
    .withMessage("Please provide the amount.")
    .isInt({ min: 0 })
    .withMessage("amount must be a positive integer or 0"),
];
