export const EnvConfiguration = () => ({
  appConfig: {
    environment: process.env.NODE_ENV,
    scope: process.env.SCOPE,

    host: process.env.HOST,
    port: +process.env.PORT!,
  },
});

export interface IAppConfig {
  environment: string;
  scope: string;

  host: string;
  port: number;
}
