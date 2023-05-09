import { cleanEnv } from "envalid";
import { port, str, host, email, url } from "envalid/dist/validators";

export default cleanEnv(process.env, {
	MONGO_URI: str(),
	SERVER_PORT: port(),
	SESSION_SECRET: str(),
	EMAIL_HOST: host(),
	EMAIL_PORT: port(),
	EMAIL_USER: email(),
	EMAIL_FROM: email(),
	EMAIL_PASS: str(),
	CLIENT_URI: url(),
    REDIS_HOST: host(),
    REDIS_PORT: port(),
    REDIS_PASSWORD: str(),
});
