import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../../models/note";
import * as NotesInterface from "../../interfaces/notes";
import styles from "../../styles/CarsPage.module.css";
import styleUtils from "../../styles/utils.module.css";
import { AddEditNoteDialog } from "../modals/AddEditNoteModal";
import { SearchInputField } from "../inputs/SearchInputField";
import { useTranslation } from "react-i18next";
import { Car } from "../Car";

export const CarsPageLoggedInView = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	const [showAddNoteModal, setShowAddNoteModal] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const { t } = useTranslation();

	useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				if (!searchQuery || searchQuery === "") {
					const notes = await NotesInterface.fetchNotes();
					setNotes(notes);
				} else {
					const notes = await NotesInterface.searchNotes(searchQuery);
					setNotes(notes);
				}
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		}
		loadNotes();
	}, [searchQuery]);

	async function deleteNote(note: NoteModel) {
		try {
			await NotesInterface.deleteNote(note._id);
			setNotes(
				notes.filter((existingNote) => existingNote._id !== note._id)
			);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const notesGrid = (
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.carsGrid}`}>
			{notes.map((note) => (
				<Col key={note._id}>
					<Car car={{ make: "Toyota", model: "Camry", year: 2021, price: "$25,000", color: "Blue", image: "/toyota_camry.jpg" }}/>
				</Col>
			))}
		</Row>
	);

	return (
		<>
			<SearchInputField
				name="search"
				placeholder={t("Search")}
				query={{ searchQuery, setSearchQuery }}
			/>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => setShowAddNoteModal(true)}
			>
				<FaPlus />
				{t("Add new car")}
			</Button>
			{notesLoading && <Spinner animation="border" variant="primary" />}
			{showNotesLoadingError && (
				<p>{t("Something went wrong. Please refresh the page.")}</p>
			)}
			{!notesLoading && !showNotesLoadingError && (
				<>
					{notes.length > 0 ? (
						notesGrid
					) : (
						<p>{t("You don't have any cars yet")}</p>
					)}
				</>
			)}
			{showAddNoteModal && (
				<AddEditNoteDialog
					onDismiss={() => setShowAddNoteModal(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setShowAddNoteModal(false);
					}}
				/>
			)}
			{noteToEdit && (
				<AddEditNoteDialog
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(
							notes.map((existingNote) =>
								existingNote._id === updatedNote._id
									? updatedNote
									: existingNote
							)
						);
						setNoteToEdit(null);
					}}
				/>
			)}
		</>
	);
};
