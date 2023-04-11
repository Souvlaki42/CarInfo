import { Container } from "react-bootstrap";
import { CarsPageLoggedInView } from "../components/views/CarsPageLoggedInView";
import { CarsPageLoggedOutView } from "../components/views/CarsPageLoggedOutView";
import styles from "../styles/CarsPage.module.css";
import { User } from "../models/user";

interface CarsPageProps {
	loggedInUser: User | null;
}

export const CarsPage = ({ loggedInUser }: CarsPageProps) => {
	return (
		<Container className={styles.carsPage}>
			<>
				{loggedInUser ? (
					<CarsPageLoggedInView />
				) : (
					<CarsPageLoggedOutView />
				)}
			</>
		</Container>
	);
};
