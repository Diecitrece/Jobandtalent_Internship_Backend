import Joi from 'joi';

export interface User {
  id: string;
  firstName: string;
  surNames: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export const schema = Joi.object({
  firstName: Joi.string(),
  surNames: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string(),
});
