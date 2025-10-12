import axios from 'axios';
import { type Note } from '../types/../types/note';
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

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
const fetchNotes = async (currentPage: number): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes?page=${currentPage}&perPage=12`,
    options
  );

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
};

const createNotes = () => {};
const deleteNotes = () => {};

export { fetchNotes, createNotes, deleteNotes };
