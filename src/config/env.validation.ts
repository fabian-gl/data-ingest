import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required().default('develop'),
  SCOPE: Joi.string().required().default('local'),

  HOST: Joi.string().required(),
  PORT: Joi.number().required(),
});
