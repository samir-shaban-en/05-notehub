export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export type NoteValueWithoutId = Omit<Note, 'id'>;
