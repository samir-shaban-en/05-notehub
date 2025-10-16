import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm.tsx';
import ReactPaginate from 'react-paginate';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';

import { fetchNotes } from '../../services/noteService';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { useState } from 'react';

import css from './App.module.css';
import style from '../Pagination/Pagination.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [text, setText] = useState('');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['data', currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
      setCurrentPage(1);
    },
    1000
  );

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
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {data && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
