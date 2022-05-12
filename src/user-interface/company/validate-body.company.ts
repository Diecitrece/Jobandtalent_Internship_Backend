import Joi, { ObjectSchema } from "joi";

export const schemaCompanyCreate: ObjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .strict()
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/))
    .messages({
      "string.empty": "The company's name can not be empty",
      "string.min":
        "The company's name lenght must be at least 3 characters long",
      "string.max":
        "The company's name can not contain more than 30 characters",
      "string.trim":
        "The company's name contains some whitespaces at the beginning and/or at the end of the field",
    }),
  address: Joi.string().trim().strict().messages({
    "string.empty": "The company's address can not be empty",
    "string.trim":
      "The company's address contains some whitespaces at the beginning and/or at the end of the field",
  }),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9+ ]+$"))
    .min(9)
    .max(14)
    .trim()
    .strict()
    .messages({
      "string.empty": "The company's phone number can not be empty",
      "string.min":
        "The company's phone number lenght must be at least 9 characters long",
      "string.max":
        "The company's phone number can not contain more than 14 characters",
      "string.trim":
        "The company's phone number contains some whitespaces at the beginning and/or at the end of the field",
      "string.pattern.base":
        "The company's phone number can only contain numbers and the '+' character",
    }),
  low_range_employees: Joi.number().integer().positive(),
  high_range_employees: Joi.number().integer().positive(),
});
