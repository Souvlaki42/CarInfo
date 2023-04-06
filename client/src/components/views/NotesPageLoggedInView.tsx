import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../../models/note";
import * as NotesInterface from "../../interfaces/notes";
import styles from "../../styles/NotesPage.module.css";
import styleUtils from "../../styles/utils.module.css";
import { AddEditNoteDialog } from "../modals/AddEditNoteModal";
import { Note } from "../Note";
import { SearchInputField } from "../SearchInputField";

export const NotesPageLoggedInView = () => {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	const [showAddNoteModal, setShowAddNoteModal] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesInterface.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		}
		loadNotes();
	}, []);
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
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
			{notes.map((note) => (
				<Col key={note._id}>
					<Note
						note={note}
						className={styles.note}
						onNoteClicked={setNoteToEdit}
						onDeleteNoteClicked={deleteNote}
					/>
				</Col>
			))}
		</Row>
	);

	return (
		<>
			<SearchInputField
				name="search"
				placeholder="Search"
				query={{ searchQuery, setSearchQuery }}
			/>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => setShowAddNoteModal(true)}
			>
				<FaPlus />
				Add new note
			</Button>
			{notesLoading && <Spinner animation="border" variant="primary" />}
			{showNotesLoadingError && (
				<p>Something went wrong. Please refresh the page.</p>
			)}
			{!notesLoading && !showNotesLoadingError && (
				<>
					{notes.length > 0 ? (
						notesGrid
					) : (
						<p>You don't have any notes yet</p>
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
