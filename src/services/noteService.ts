import axios from 'axios';
import { type Note } from '../types/../types/note';
import { type NoteValueWithoutId } from '../types/note';
const myKey = import.meta.env.VITE_NOTEHUB_TOK;

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${myKey}`,
  },
};

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const fetchNotes = async (
  currentPage: number,
  text: string
): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes?search=${text}&page=${currentPage}&perPage=12`,
    options
  );

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
};

const createNotes = async (values: NoteValueWithoutId) => {
  const res = await axios.post(
    'https://notehub-public.goit.study/api/notes',
    values,
    options
  );
  return res.data;
};

const deleteNote = async (noteId: string) => {
  console.log(noteId);
  const res = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    options
  );
  console.log(res.data);
  return res.data;
};

export { fetchNotes, createNotes, deleteNote };
