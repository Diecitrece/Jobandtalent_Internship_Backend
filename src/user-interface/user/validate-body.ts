import Joi, { ObjectSchema } from "joi";

export const schemaUserRegister: ObjectSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30),
  surNames: Joi.string().alphanum().min(3).max(60),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  phone: Joi.string().alphanum().length(14),
  address: Joi.string(),
});
