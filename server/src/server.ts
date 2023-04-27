import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.SERVER_PORT;

mongoose.set("strictQuery", false);

mongoose
	.connect(env.MONGO_URI)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port: ${port}`);
		});
	})
	.catch(console.error);
