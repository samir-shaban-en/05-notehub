import css from './NoteList.module.css';
import { type Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
}
const NoteList = ({ notes }: NoteListProps) => (
  <ul className={css.list}>
    {notes.map((item) => {
      return (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default NoteList;
