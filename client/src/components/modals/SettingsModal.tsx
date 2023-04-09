import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../utils/httpErrors";
import styleUtils from "../../styles/utils.module.css";
import { DismissibleAlert } from "../DismissibleAlert";
import { CheckInputField } from "../inputs/CheckInputField";
import { SelectInputField } from "../inputs/SelectInputField";
import { Settings } from "../../App";
import { useTranslation } from "react-i18next";

interface SettingsCredentials {
	darkmode: boolean;
	language: string;
}

interface SettingsModalProps {
	onDismiss: () => void;
	onSettingsSaved: (settings: Settings) => void;
}

const SettingsModal = ({ onDismiss, onSettingsSaved }: SettingsModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SettingsCredentials>();

	async function onSubmit(credentials: SettingsCredentials) {
		try {
			onSettingsSaved({
				darkmode: credentials.darkmode,
				language: credentials.language,
			});
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
				<Modal.Title>{t("Settings")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && (
					<DismissibleAlert variant="danger" text={errorText} />
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<CheckInputField
						name="darkmode"
						label={t("Dark Mode")}
						type="switch"
						defaultChecked={
							JSON.parse(
								localStorage.getItem("settings") as string
							).darkmode
						}
						register={register}
						registerOptions={{}}
						error={errors.darkmode}
					/>
					<SelectInputField
						name="language"
						label={t("Language")}
						defaultOption={
							JSON.parse(
								localStorage.getItem("settings") as string
							).language
						}
						options={
							<>
								<option value="auto">{t("Default")}</option>
								<option value="en">{t("English")}</option>
								<option value="gr">{t("Greek")}</option>
							</>
						}
						register={register}
						registerOptions={{}}
						error={errors.language}
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						{t("Save Settings")}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SettingsModal;
