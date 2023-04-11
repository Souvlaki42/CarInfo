import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../utils/httpErrors";
import { User } from "../../models/user";
import * as UsersInterface from "../../interfaces/users";
import { SignUpCredentials } from "../../interfaces/users";
import styleUtils from "../../styles/utils.module.css";
import { DismissibleAlert } from "../DismissibleAlert";
import { TextInputField } from "../inputs/TextInputField";
import { PasswordInputField } from "../inputs/PasswordInputField";
import { useTranslation } from "react-i18next";

interface SignUpModalProps {
	onDismiss: () => void;
	onSignUpSuccessful: (user: User) => void;
}

export const SignUpModal = ({
	onDismiss,
	onSignUpSuccessful,
}: SignUpModalProps) => {
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string | null>(null);
	const [otpSent, setOtpSent] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpCredentials>();

	async function onSubmit(credentials: SignUpCredentials) {
		try {
			if (otpSent) {
				if (
					await UsersInterface.verifyOTP({
						email: credentials.email,
						otp: credentials.otp,
					})
				) {
					const newUser = await UsersInterface.signUp(credentials);
					onSignUpSuccessful(newUser);
				}
			} else {
				await UsersInterface.sendOTP(
					{
						email: credentials.email,
						username: credentials.username,
					},
					t("Email Verification"),
					`${t("Please verify your account using this one time password")}:`
				);
				setOtpSent(true);
			}
		} catch (error) {
			if (error instanceof ConflictError) {
				setErrorText(error.message);
			} else {
				alert(error);
			}
			console.error(error);
		}
	}

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>{t("Sign Up")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && (
					<DismissibleAlert variant="danger" text={errorText} />
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name="username"
						label={t("Username")}
						type="text"
						placeholder={t("Username")}
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.username}
					/>
					<TextInputField
						name="email"
						label="Email"
						type="email"
						placeholder="Email"
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.email}
					/>
					<PasswordInputField
						name="password"
						label={t("Password")}
						register={register}
						placeholder={t("Password")}
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<TextInputField
						name="otp"
						label={t("One Time Password")}
						type="text"
						placeholder={t("One Time Password")}
						register={register}
						registerOptions={
							otpSent ? { required: "Required" } : {}
						}
						error={errors.otp}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						{otpSent ? t("Sign Up") : t("Send OTP")}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
