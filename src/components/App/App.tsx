import { fetchNotes } from '../../services/noteService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import style from '../Pagination/Pagination.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, error, data } = useQuery({
    queryKey: ['data', currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

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
          {/* Кнопка створення нотатки */}
        </header>
      </div>

      {data && <NoteList notes={data.notes} />}
    </>
  );
}

export default App;
