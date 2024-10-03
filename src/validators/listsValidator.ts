import { body, param } from "express-validator";

export const validateAddCustomList = [
  // Validate and sanitize name
  body("name").trim().notEmpty().withMessage("Please provide the list's name."),

  // validate and sanitize date
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
