import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Note } from "../types/note.interface";
import { useCallback, useEffect, useState } from "react";
import EmptyState from "./shared/EmptyState";
import NoteCard from "./NoteCard";

interface Props {
  editNoteHandler?: (note: Note) => void;
  searchValue?: string;
}
const NotesList = (props: Props) => {
  const { editNoteHandler, searchValue } = props;

  const notes = useSelector((state: RootState) => state.notes);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const searchHandler = useCallback(
    (value: string) => {
      setFilteredNotes(
        notes.filter((note) => {
          if (note.title.toLowerCase().match(value)) return note;
        })
      );
    },
    [notes]
  );

  const notesToDisplay =
    filteredNotes.length > 0 || searchValue ? filteredNotes : notes;

  useEffect(() => {
    if (!searchValue) {
      setFilteredNotes([]);
      return;
    }
    searchHandler(searchValue.toLowerCase());
  }, [searchValue, searchHandler]);

  return (
    <>
      {notesToDisplay.length ? (
        <div className="grid grid--4 gap--32">
          {notesToDisplay.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              editNoteHandler={editNoteHandler}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default NotesList;
