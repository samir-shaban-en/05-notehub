import css from './NoteList.module.css';
import { type Note } from '../../types/note';
interface NoteListProps {
  notes: Note;
}
const NoteList = (notes: NoteListProps) => (
  <ul className={css.list}>
    <li className={css.listItem}>
      <h2 className={css.title}>Note title</h2>
      <p className={css.content}>Note content</p>
      <div className={css.footer}>
        <span className={css.tag}>Note tag</span>
        <button className={css.button}>Delete</button>
      </div>
    </li>
  </ul>
);

export default NoteList;
