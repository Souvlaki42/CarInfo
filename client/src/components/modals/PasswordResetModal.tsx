import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";
import { LoginCredentials } from "../network/users_api";
import styleUtils from "../styles/utils.module.css";
import DismissibleAlert from "./form/DismissibleAlert";
import TextInputField from "./form/TextInputField";

interface LoginModalProps {
	onDismiss: () => void;
	onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginCredentials>();

	async function onSubmit(credentials: LoginCredentials) {
		try {
			const user = await UsersApi.login(credentials);
			onLoginSuccessful(user);
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
				<Modal.Title>Log In</Modal.Title>
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
						name="password"
						label="Password"
						type="password"
						placeholder="Password"
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<Form.Label className="mb-3">Forgot Password?</Form.Label>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						Log In
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;