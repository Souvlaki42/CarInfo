import { createTransport } from "nodemailer";
import env from "./validateEnv";

export const sendEmail = (
	subject: string,
	message: string,
	send_to: string,
	sent_from: string,
	reply_to: string
) => {
	const TRANSPORTER_OPTIONS = {
		host: env.EMAIL_HOST,
		port: env.EMAIL_PORT,
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	};

	const EMAIL_OPTIONS = {
		from: sent_from,
		to: send_to,
		replyTo: reply_to,
		subject: subject,
		html: message,
	};

	const transporter = createTransport(TRANSPORTER_OPTIONS);

	transporter.sendMail(EMAIL_OPTIONS, function (err, info) {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(info);
		}
	});
};
