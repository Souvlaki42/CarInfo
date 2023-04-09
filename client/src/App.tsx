import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginModal } from "./components/modals/LoginModal";
import { NavBar } from "./components/NavBar";
import { SignUpModal } from "./components/modals/SignUpModal";
import { User } from "./models/user";
import * as UsersInterface from "./interfaces/users";
import { NotesPage } from "./pages/NotesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import styles from "./styles/App.module.css";
import PasswordResetModal from "./components/modals/PasswordResetModal";
import SettingsModal from "./components/modals/SettingsModal";
import { useTranslation } from "react-i18next";

export interface Settings {
	darkmode: boolean;
	language: string;
}

export function App() {
	const { i18n } = useTranslation();
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
	const [showSettingsModal, setshowSettingsModal] = useState(false);

	const [settings, setSettings] = useState<Settings>(
		JSON.parse(localStorage.getItem("settings") as string) as
			| Settings
			| { darkmode: false; language: "auto" }
	);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UsersInterface.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	useEffect(() => {
		localStorage.setItem("settings", JSON.stringify(settings));
		document
			.querySelector("html")
			?.setAttribute(
				"data-bs-theme",
				settings.darkmode === true ? "dark" : "light"
			);
		const getLanguage = (language: string) => {
			if (language === "en" || language === "gr") return language;
			else return "auto";
		};
		document
			.querySelector("html")
			?.setAttribute("language", getLanguage(settings.language));
		switch (document.querySelector("html")?.getAttribute("language")) {
			case "auto":
				i18n.changeLanguage(navigator.language.split("-")[0]);
				break;
			case "gr":
				i18n.changeLanguage("gr");
				break;
			default:
				i18n.changeLanguage("en");
				break;
		}
	}, [settings]);

	return (
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onSignUpClicked={() => setShowSignUpModal(true)}
					onSettingsClicked={() => setshowSettingsModal(true)}
					onLogoutSuccessful={() => setLoggedInUser(null)}
				/>
				<Container className={styles.pageContainer}>
					<Routes>
						<Route
							path="/notes"
							element={<NotesPage loggedInUser={loggedInUser} />}
						/>
						<Route path="/privacy" element={<PrivacyPage />} />
						<Route path="/*" element={<NotFoundPage />} />
					</Routes>
				</Container>
				{showSignUpModal && (
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccessful={(user) => {
							setLoggedInUser(user);
							setShowSignUpModal(false);
						}}
					/>
				)}
				{showLoginModal && (
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onShowPasswordResetModal={() => {
							setShowLoginModal(false);
							setShowPasswordResetModal(true);
						}}
						onLoginSuccessful={(user) => {
							setLoggedInUser(user);
							setShowLoginModal(false);
						}}
					/>
				)}
				{showPasswordResetModal && (
					<PasswordResetModal
						onDismiss={() => setShowPasswordResetModal(false)}
						onPasswordResetSuccessful={(user) => {
							setLoggedInUser(user);
							setShowPasswordResetModal(false);
						}}
					/>
				)}
				{showSettingsModal && (
					<SettingsModal
						onDismiss={() => setshowSettingsModal(false)}
						onSettingsSaved={(settings: Settings) => {
							setshowSettingsModal(false);
							setSettings(settings);
						}}
					/>
				)}
			</div>
		</BrowserRouter>
	);
}
