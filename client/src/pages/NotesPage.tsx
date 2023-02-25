import { Container } from "react-bootstrap";
import { NotesPageLoggedInView } from "../components/views/NotesPageLoggedInView";
import { NotesPageLoggedOutView } from "../components/views/NotesPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
	loggedInUser: User | null;
}

export const NotesPage = ({ loggedInUser }: NotesPageProps) => {
	return (
		<Container className={styles.notesPage}>
			<>
				{loggedInUser ? (
					<NotesPageLoggedInView />
				) : (
					<NotesPageLoggedOutView />
				)}
			</>
		</Container>
	);
};
