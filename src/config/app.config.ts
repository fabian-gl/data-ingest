export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  scope: process.env.SCOPE,

  host: process.env.HOST,
  port: +process.env.PORT!,
});
