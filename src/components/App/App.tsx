import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm /NoteForm';
import ReactPaginate from 'react-paginate';
import SearchBox from '../SearchBox/SearchBox';

import {
  fetchNotes,
  createNotes,
  deleteNote,
} from '../../services/noteService';

import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { useState, useEffect } from 'react';

import css from './App.module.css';
import style from '../Pagination/Pagination.module.css';

import { type NoteValueWithoutId } from '../../types/note';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['data', currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const mutationCreateNotation = useMutation({
    mutationFn: async (values: NoteValueWithoutId) => {
      await createNotes(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
    },
    onError: () => {
      // An error happened!
    },
  });

  const getFormValues = (values: NoteValueWithoutId) => {
    mutationCreateNotation.mutate(values);
  };

  const mutationDeleteNotation = useMutation({
    mutationFn: async (noteId: string) => {
      await deleteNote(noteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
    },
    onError: () => {
      // An error happened!
    },
  });

  const deteteNote = (noteId: string) => {
    mutationDeleteNotation.mutate(noteId);
  };

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    1000
  );

  useEffect(() => {
    console.log(`Make HTTP request with: ${text}`);
  }, [text]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />

          {totalPages > 0 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={currentPage - 1}
              containerClassName={style.pagination}
              activeClassName={style.active}
              nextLabel='→'
              previousLabel='←'
            />
          )}
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </header>
      </div>

      {data && <NoteList notes={data.notes} deleteNote={deteteNote} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm getFormValues={getFormValues} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
