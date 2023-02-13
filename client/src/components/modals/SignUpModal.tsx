import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../utils/httpErrors";
import { User } from "../../models/user";
import * as UsersApi from "../../network/users_api";
import { SignUpCredentials } from "../../network/users_api";
import styleUtils from "../../styles/utils.module.css";
import DismissibleAlert from "../DismissibleAlert";
import TextInputField from "../TextInputField";
import PasswordInputField from "../PasswordInputField";
import OTPInputField from "../OTPInputField";

interface SignUpModalProps {
	onDismiss: () => void;
	onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
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
				if (await UsersApi.verifyOTP({email: credentials.email, otp: `${credentials.otp_1}${credentials.otp_2}${credentials.otp_3}${credentials.otp_4}${credentials.otp_5}${credentials.otp_6}`})) {
					const newUser = await UsersApi.signUp(credentials);
					onSignUpSuccessful(newUser);
				}
			} else {
				await UsersApi.sendOTP({ email: credentials.email, username: credentials.username });
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
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && (
					<DismissibleAlert variant="danger" text={errorText} />
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name="username"
						label="Username"
						type="text"
						placeholder="Username"
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
						label="Password"
						register={register}
						placeholder="Password"
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<OTPInputField
						name="otp"
						label="One Time Password"
						register={register}
						registerOptions={
							otpSent ? { required: "Required" } : {}
						}
						error={errors.otp_1}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						{otpSent ? "Sign Up" : "Send OTP"}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SignUpModal;
