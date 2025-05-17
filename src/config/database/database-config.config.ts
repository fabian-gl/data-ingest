import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(27017),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_EXTRA_URI: Joi.string().allow(''),
  DB_SSL: Joi.boolean(),
});

export const EnvConfiguration = () => ({
  dbConfig: {
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    extraUri: process.env.DB_EXTRA_URI,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true',
  },
});
