import Joi, { ObjectSchema } from 'joi';

export const schemaUserRegister: ObjectSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/)),
  surNames: Joi.string()
    .min(3)
    .max(60)
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/)),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  phone: Joi.string().alphanum().min(9).max(14),
  address: Joi.string(),
});
