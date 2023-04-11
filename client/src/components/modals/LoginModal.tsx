import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../utils/httpErrors";
import { User } from "../../models/user";
import * as UsersInterface from "../../interfaces/users";
import { LoginCredentials } from "../../interfaces/users";
import styleUtils from "../../styles/utils.module.css";
import { DismissibleAlert } from "../DismissibleAlert";
import { TextInputField } from "../inputs/TextInputField";
import { PasswordInputField } from "../inputs/PasswordInputField";
import { useTranslation } from "react-i18next";

interface LoginModalProps {
	onDismiss: () => void;
	onLoginSuccessful: (user: User) => void;
	onShowPasswordResetModal: () => void;
}

export const LoginModal = ({
	onDismiss,
	onLoginSuccessful,
	onShowPasswordResetModal,
}: LoginModalProps) => {
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginCredentials>();

	async function onSubmit(credentials: LoginCredentials) {
		try {
			const user = await UsersInterface.login(credentials);
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
				<Modal.Title>{t("Log In")}</Modal.Title>
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
					<PasswordInputField
						name="password"
						label={t("Password")}
						placeholder={t("Password")}
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.password}
					/>
					<Form.Label
						className={`mb-3 ${styleUtils.link}`}
						onClick={onShowPasswordResetModal}
					>
						{t("Forgot Password?")}
					</Form.Label>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						{t("Log In")}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
