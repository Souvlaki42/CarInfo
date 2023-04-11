import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface NavBarLoggedOutViewProps {
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
}

export const NavBarLoggedOutView = ({
	onSignUpClicked,
	onLoginClicked,
}: NavBarLoggedOutViewProps) => {
	const { t } = useTranslation();
	return (
		<>
			<Button onClick={onSignUpClicked}>{t("Sign Up")}</Button>
			<Button onClick={onLoginClicked}>{t("Log In")}</Button>
		</>
	);
};
