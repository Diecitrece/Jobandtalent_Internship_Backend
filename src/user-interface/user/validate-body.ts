import Joi, { ObjectSchema } from "joi";

const emailSchema = Joi.string()
  .email({ minDomainSegments: 2 })
  .required()
  .trim()
  .strict()
  .messages({
    "string.empty": "Your email can not be empty",
    "string.trim":
      "Your email contains some whitespaces at the beginning and/or at the end of the field",
    "string.email":
      "Your email needs to be formated like an email address (example@host.com)",
  });
const passwordSchema = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9_ ]{3,30}$"))
  .min(3)
  .max(30)
  .required()
  .messages({
    "string.empty": "Your password can not be empty",
    "string.pattern.base":
      "Your password can only contain lowercase and uppercase letters, numbers, '_' character and whitespaces",
    "string.min": "Your password lenght must be at least 3 characters long",
    "string.max": "Your password can not contain more than 30 characters",
  });
export const schemaUserRegister: ObjectSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .strict()
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/))
    .messages({
      "string.empty": "Your first name can not be empty",
      "string.min": "Your first name lenght must be at least 3 characters long",
      "string.max": "Your first name can not contain more than 30 characters",
      "string.trim":
        "Your first name contains some whitespaces at the beginning and/or at the end of the field",
    }),
  surNames: Joi.string()
    .min(3)
    .max(60)
    .trim()
    .strict()
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/))
    .messages({
      "string.empty": "Your last name can not be empty",
      "string.min": "Your last name lenght must be at least 3 characters long",
      "string.max":
        "Your last name can not contain more than 60 characters. Are you basque?",
      "string.trim":
        "Your last name contains some whitespaces at the beginning and/or at the end of the field",
    }),
  email: emailSchema,
  password: passwordSchema,
  phone: Joi.string()
    .pattern(new RegExp("^[0-9+ ]+$"))
    .min(9)
    .max(14)
    .trim()
    .strict()
    .messages({
      "string.empty": "Your phone number can not be empty",
      "string.min":
        "Your phone number lenght must be at least 9 characters long",
      "string.max": "Your phone number can not contain more than 14 characters",
      "string.trim":
        "Your phone number contains some whitespaces at the beginning and/or at the end of the field",
      "string.pattern.base":
        "Your phone number can only contain numbers and the '+' character",
    }),
  address: Joi.string().trim().strict().messages({
    "string.empty": "Your address can not be empty",
    "string.trim":
      "Your address contains some whitespaces at the beginning and/or at the end of the field",
  }),
});

export const schemaUserLogin: ObjectSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
