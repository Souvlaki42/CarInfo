import env from "./validateEnv";
import { TransactionalEmailsApi } from "sib-api-v3-typescript";

const sendInBlue = new TransactionalEmailsApi();
sendInBlue.setApiKey(0, env.EMAIL_API);

interface Recipient {
	name: string;
	email: string;
}

interface EmailBody {
	subject: string;
	content: string;
}

interface Email {
	recipient: Recipient;
	body: EmailBody;
}

export const sendEmail = ({
	recipient: { name, email },
	body: { subject, content },
}: Email) => {
	try {
		sendInBlue
			.sendTransacEmail({
				to: [{ name: name, email: email }],
				sender: { name: "Souvlaki42", email: "souvlaki42@souvlaki.me" },
				subject: subject,
				htmlContent: content,
			})
			.then(
				function (data) {
					console.log(`Email sent successfully with data: ${data}`);
				},
				function (error) {
					console.error(error);
				}
			);
	} catch (error) {
		console.error(error);
	}
};
