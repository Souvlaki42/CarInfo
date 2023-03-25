import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.set("strictQuery", false);

mongoose
	.connect(env.MONGO_CONNECTION_STRING)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port: ${port}`);
		});
	})
	.catch(console.error);
