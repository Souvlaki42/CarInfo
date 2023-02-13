import { cleanEnv } from "envalid";
import { port, str, host, email } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    EMAIL_HOST: host(),
    EMAIL_PORT: port(),
    EMAIL_USER: email(),
    EMAIL_PASS: str(),
});