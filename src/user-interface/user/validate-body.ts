import Joi, { ObjectSchema } from "joi";

const emailSchema = Joi.string().email({ minDomainSegments: 2 }).required();
const passwordSchema = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();
export const schemaUserRegister: ObjectSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/)),
  surNames: Joi.string()
    .min(3)
    .max(60)
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/)),
  email: emailSchema,
  password: passwordSchema,
  phone: Joi.string().alphanum().length(14),
  address: Joi.string(),
});

export const schemaUserLogin: ObjectSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
