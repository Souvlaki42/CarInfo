import { MdDelete } from "react-icons/md";
import styles from "../styles/Car.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatDate, getLocaleFromLanguage } from "../utils/formatDate";

interface Car {
	image: string;
	model: string;
	make: string;
	year: number;
	price: string;
	color: string;
}

interface CarProps {
	car: Car;
}

export const Car = ({ car }: CarProps) => {

	let carCardStyle: CSSModuleClasses[string];
	let carTitleStyle: CSSModuleClasses[string];
	if (document.querySelector("html")?.getAttribute("data-bs-theme") === "light") {
		carCardStyle = styles.carCard;
		carTitleStyle = styles.carTitle;
	} else {
		carCardStyle = styles.carCardDark;
		carTitleStyle = styles.carTitleDark;
	}

	function onDeleteNoteClicked(car: Car) {
		alert(`Car ${car.year} is deleted!`);
	}

	const { i18n, t } = useTranslation();

	const createdAt = "2023-03-22T17:54:11.549+00:00";
	const updatedAt = "2023-03-22T17:54:11.549+00:00";

	let createdUpdatedText: string;
	if (updatedAt > createdAt) {
		createdUpdatedText = `${t("Updated")}: ${formatDate(
			updatedAt,
			getLocaleFromLanguage(i18n.language)
		)}`;
	} else {
		createdUpdatedText = `${t("Created")}: ${formatDate(
			createdAt,
			getLocaleFromLanguage(i18n.language)
		)}`;
	}

	const image = car.image || "https://placehold.co/3450x1590";

	return (
		<Card className={carCardStyle}>
			<Card.Img variant="top" src={image} width={"256px"} height={"192px"} loading="lazy" alt={`${car.make} ${car.model}`}/>
			<Card.Body>
				<Card.Title className={`${carTitleStyle} ${styleUtils.flexCenter}`}>
					{car.make} {car.model}
					<MdDelete
						onClick={(e) => {
							onDeleteNoteClicked(car);
							e.stopPropagation();
						}}
						className="text-muted ms-auto"
					/>
				</Card.Title>
				<Card.Text>
					Engine Number: 5226272
					<br />
					Frame: fagahahaj
					<br />
					License Plate: ttwtw6277hshs
					<br />
					Year: {car.year}
					<br />
					Price: {car.price}
					{/* <br />
					Color: {car.color} */}
				</Card.Text>
			</Card.Body>
			<Card.Footer className="text-muted">
				{createdUpdatedText}
			</Card.Footer>
		</Card>
	);
};
