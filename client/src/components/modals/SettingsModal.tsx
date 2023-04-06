import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../utils/httpErrors";
import styleUtils from "../../styles/utils.module.css";
import { DismissibleAlert } from "../DismissibleAlert";
import { CheckInputField } from "../inputs/CheckInputField";
import { SelectInputField } from "../inputs/SelectInputField";

interface SettingsCredentials {
	darkmode: boolean;
	language: string;
}

interface SettingsModalProps {
	onDismiss: () => void;
	onSettingsSaved: () => void;
}

const SettingsModal = ({ onDismiss, onSettingsSaved }: SettingsModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SettingsCredentials>();

	async function onSubmit(credentials: SettingsCredentials) {
		try {
			alert("Yeah!");
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
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && (
					<DismissibleAlert variant="danger" text={errorText} />
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<CheckInputField
						name="darkmode"
						label="Dark Mode"
						type="switch"
						defaultChecked={false}
						register={register}
						registerOptions={{}}
						error={errors.darkmode}
					/>
					<SelectInputField
						name="language"
						label="Language"
						defaultOption="auto"
						options={<>
							<option value="auto">Default</option>
							<option value="en">English</option>
							<option value="gr">Greek</option>
						</>}
						register={register}
						registerOptions={{}}
						error={errors.language}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						Save Settings
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SettingsModal;
