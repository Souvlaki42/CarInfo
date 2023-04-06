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

export function App() {
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

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

	return (
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onSignUpClicked={() => setShowSignUpModal(true)}
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
			</div>
		</BrowserRouter>
	);
}
