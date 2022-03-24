export interface User {
  id: string;
  firstName: string;
  surNames: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    surnames: Joi.string()
        .alphanum()
        .min(3)
        .max(60),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    phone : Joi.string()
        .alphanum()
        .length(14)

});

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }