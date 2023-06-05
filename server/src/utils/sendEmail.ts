import env from "./validateEnv";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
	apiKey: env.EMAIL_API,
});

interface Receiver {
	name: string;
	email: string;
}

interface EmailBody {
	subject: string;
	content: string;
}

interface Email {
	receiver: Receiver;
	body: EmailBody;
}

export const sendEmail = async ({
	receiver: { name, email },
	body: { subject, content },
}: Email) => {
	const sentFrom = new Sender(env.EMAIL_FROM, env.EMAIL_NAME);
	const recipients = [new Recipient(email, name)];

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject(subject)
		.setHtml(content);

	const response = await mailerSend.email.send(emailParams);

	if (response.statusCode !== 200) console.error(response.body);
};
