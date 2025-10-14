import { fetchNotes } from '../../services/noteService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import style from '../Pagination/Pagination.module.css';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm /NoteForm';
import { type Note } from '../../types/note';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery({
    queryKey: ['data', currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  type NoteValueWithoutId = Omit<Note, 'id'>;
  const getFormValues = (values: NoteValueWithoutId) => {
    console.log(values);
  };

  const totalPages = data?.totalPages ?? 0;
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
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
          <button className={css.button}>Create note +</button>
        </header>
      </div>
      {data && <NoteList notes={data.notes} />}

      <Modal>
        <NoteForm getFormValues={getFormValues} />
      </Modal>
    </>
  );
}

export default App;
