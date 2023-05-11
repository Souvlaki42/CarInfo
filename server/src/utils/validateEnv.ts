import { cleanEnv } from "envalid";
import { port, str, host, url } from "envalid/dist/validators";

export default cleanEnv(process.env, {
	MONGO_URI: str(),
	SERVER_PORT: port(),
	SESSION_SECRET: str(),
	CLIENT_URI: url(),
    REDIS_HOST: host(),
    REDIS_PORT: port(),
    REDIS_PASSWORD: str(),
	EMAIL_API: str(),
});
