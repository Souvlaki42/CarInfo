import { Note } from "../models/note";
import { fetchData } from "../utils/fetchData";

export async function fetchNotes(): Promise<Note[]> {
	const response = await fetchData("/api/notes", {
		method: "GET",
	});
	return response.json();
}

export interface NoteInput {
	title: string;
	text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
	const response = await fetchData("/api/notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	});
	return response.json();
}

export async function updateNote(
	noteId: string,
	note: NoteInput
): Promise<Note> {
	const response = await fetchData(`/api/notes/${noteId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	});
	return response.json();
}

export async function deleteNote(noteId: string) {
	await fetchData(`/api/notes/${noteId}`, {
		method: "DELETE",
	});
}

export async function searchNotes(query: string): Promise<Note[]> {
	const response = await fetchData("/api/notes/search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({query: query}),
	});
	return response.json();
}

export interface NoteInput {
	title: string;
	text?: string;
}
