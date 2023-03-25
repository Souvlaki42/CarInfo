import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../utils/httpErrors";
import { User } from "../../models/user";
import * as UsersApi from "../../network/users_api";
import { PasswordResetCredentials } from "../../network/users_api";
import styleUtils from "../../styles/utils.module.css";
import { DismissibleAlert } from "../DismissibleAlert";
import { PasswordInputField } from "../PasswordInputField";
import { TextInputField } from "../TextInputField";

interface PasswordResetModalProps {
	onDismiss: () => void;
	onPasswordResetSuccessful: (user: User) => void;
}

const PasswordResetModal = ({
	onDismiss,
	onPasswordResetSuccessful,
}: PasswordResetModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);
	const [otpSent, setOtpSent] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<PasswordResetCredentials>();

	async function onSubmit(credentials: PasswordResetCredentials) {
		try {
			if (otpSent) {
				if (
					await UsersApi.verifyOTP({
						email: credentials.email,
						otp: credentials.otp,
					})
				) {
					const user = await UsersApi.passwordReset(credentials);
					onPasswordResetSuccessful(user);
				}
			} else {
				await UsersApi.sendOTP(
					{ email: credentials.email },
					"Reset Password",
					"Please verify your password reset request using this one time password:"
				);
				setOtpSent(true);
			}
		} catch (error) {
			if (error instanceof UnauthorizedError) {
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
				<Modal.Title>Password Reset</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && (
					<DismissibleAlert variant="danger" text={errorText} />
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
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
						label="Password"
						register={register}
						placeholder="Password"
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<PasswordInputField
						name="password2"
						label="Verify Password"
						register={register}
						placeholder="Verify Password"
						registerOptions={{ required: "Required" }}
						error={errors.password2}
					/>
					<TextInputField
						name="otp"
						label="One Time Password"
						type="text"
						placeholder="One Time Password"
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
						{otpSent ? "Reset Password" : "Send OTP"}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default PasswordResetModal;
