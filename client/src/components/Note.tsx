import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface NoteProps {
	note: NoteModel;
	onNoteClicked: (note: NoteModel) => void;
	onDeleteNoteClicked: (note: NoteModel) => void;
	className?: string;
}

export const Note = ({
	note,
	onNoteClicked,
	onDeleteNoteClicked,
	className,
}: NoteProps) => {
	const { title, text, createdAt, updatedAt } = note;
	const { i18n, t } = useTranslation();

	function getLocaleFromLanguage(language: string) {
		if (language === "gr") return "el-GR";
		else return "en-US";
	}

	let createdUpdatedText: string;
	if (updatedAt > createdAt) {
		createdUpdatedText = `${t("Updated")}: ${formatDate(updatedAt, getLocaleFromLanguage(i18n.language))}`;
	} else {
		createdUpdatedText = `${t("Created")}: ${formatDate(createdAt, getLocaleFromLanguage(i18n.language))}`;
	}

	return (
		<Card
			className={`${styles.noteCard} ${className}`}
			onClick={() => onNoteClicked(note)}
		>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={styleUtils.flexCenter}>
					{title}
					<MdDelete
						onClick={(e) => {
							onDeleteNoteClicked(note);
							e.stopPropagation();
						}}
						className="text-muted ms-auto"
					/>
				</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
			<Card.Footer className="text-muted">
				{createdUpdatedText}
			</Card.Footer>
		</Card>
	);
};
