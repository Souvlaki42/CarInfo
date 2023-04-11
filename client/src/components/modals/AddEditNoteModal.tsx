import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../../models/note";
import { NoteInput } from "../../interfaces/notes";
import * as NotesInterface from "../../interfaces/notes";
import { TextInputField } from "../inputs/TextInputField";
import { useTranslation } from "react-i18next";

interface AddEditNoteDialogProps {
	noteToEdit?: Note;
	onDismiss: () => void;
	onNoteSaved: (note: Note) => void;
}

export const AddEditNoteDialog = ({
	noteToEdit,
	onDismiss,
	onNoteSaved,
}: AddEditNoteDialogProps) => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<NoteInput>({
		defaultValues: {
			title: noteToEdit?.title || "",
			text: noteToEdit?.text || "",
		},
	});

	async function onSubmit(input: NoteInput) {
		try {
			let noteResponse: Note;
			if (noteToEdit) {
				noteResponse = await NotesInterface.updateNote(
					noteToEdit._id,
					input
				);
			} else {
				noteResponse = await NotesInterface.createNote(input);
			}
			onNoteSaved(noteResponse);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>
					{noteToEdit ? t("Edit Note") : t("Add Note")}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name="title"
						label={t("Title")}
						type="text"
						placeholder={t("Title")}
						register={register}
						registerOptions={{ required: "Required" }}
						error={errors.title}
					/>
					<TextInputField
						name="text"
						label={t("Text")}
						as="textarea"
						rows={5}
						placeholder={t("Text")}
						register={register}
					/>
					<Button
						type="submit"
						form="addEditNoteForm"
						disabled={isSubmitting}
					>
						{t("Save")}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
