import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import * as UsersInterface from "../../interfaces/users";
import { useTranslation } from "react-i18next";

interface NavBarLoggedInViewProps {
	user: User;
	onLogoutSuccessful: () => void;
}

export const NavBarLoggedInView = ({
	user,
	onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
	const { t } = useTranslation();

	async function logout() {
		try {
			await UsersInterface.logout();
			onLogoutSuccessful();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
	return (
		<>
			<Navbar.Text className="me-2">
				{t("Signed in as: {{username}}", {username: user.username})}
			</Navbar.Text>
			<Button onClick={logout}>{t("Log out")}</Button>
		</>
	);
};
