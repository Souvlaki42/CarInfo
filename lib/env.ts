import { cleanEnv, host, str } from "envalid";

export const env = cleanEnv(process.env, {
  DATABASE_HOST: host(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
});
