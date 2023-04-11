import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 1000,
		},
		rolling: true,
		store: MongoStore.create({
			mongoUrl: env.MONGO_CONNECTION_STRING,
		}),
	})
);

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);
app.use("/api/locales", express.static(path.join(__dirname, "./locales")));

app.use((req, res, next) => {
	next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = "An unknown error occurred";
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
});

export default app;
