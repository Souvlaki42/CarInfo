import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import { NavBarLoggedInView } from "./views/NavBarLoggedInView";
import { NavBarLoggedOutView } from "./views/NavBarLoggedOutView";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavBarProps {
	loggedInUser: User | null;
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
	onLogoutSuccessful: () => void;
	onSettingsClicked: () => void;
}

export const NavBar = ({
	loggedInUser,
	onSignUpClicked,
	onLoginClicked,
	onLogoutSuccessful,
	onSettingsClicked,
}: NavBarProps) => {
	const { t } = useTranslation();
	return (
		<Navbar bg="primary" variant="dark" expand="sm" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Car Info
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav>
						<Nav.Link as={Link} to={"/notes"}>
							{t("Notes")}
						</Nav.Link>
						<Nav.Link as={Link} to={"/privacy"}>
							{t("Privacy")}
						</Nav.Link>
					</Nav>
					<Nav className="ms-auto">
						{loggedInUser ? (
							<NavBarLoggedInView
								user={loggedInUser}
								onLogoutSuccessful={onLogoutSuccessful}
							/>
						) : (
							<NavBarLoggedOutView
								onLoginClicked={onLoginClicked}
								onSignUpClicked={onSignUpClicked}
							/>
						)}
						<Button onClick={onSettingsClicked}>{t("Settings")}</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
