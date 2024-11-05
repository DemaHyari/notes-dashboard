import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Note } from "../types/note.interface";
import { useCallback, useEffect, useState } from "react";
import EmptyState from "./shared/EmptyState";
import NoteCard from "./NoteCard";

interface Props {
  editNoteHandler?: (note: Note) => void;
  searchValue?: string;
  activeType?: "all" | "personal" | "work" | "study" | "appointment";
}
const NotesList = (props: Props) => {
  const { editNoteHandler, searchValue, activeType = "all" } = props;

  const notes = useSelector((state: RootState) => state.notes);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  /**
   * Filters the notes based on the provided search term and type.
   *
   * @param {string} searchTerm - The term to search for in the note titles.
   * @param {string} type - The type of notes to filter by. If "all", all types are included.
   * @returns {Array} The filtered list of notes.
   */
  const filterNotes = useCallback(
    (searchTerm: string, type: string) => {
      return notes.filter((note) => {
        const matchesType = type === "all" || note.type === type;
        const matchesSearch = note.title.toLowerCase().includes(searchTerm);

        return matchesType && matchesSearch;
      });
    },
    [notes]
  );

  useEffect(() => {
    const term = searchValue?.toLowerCase() || "";
    setFilteredNotes(filterNotes(term, activeType));
  }, [searchValue, activeType, filterNotes]);

  return (
    <>
      {filteredNotes.length ? (
        <div className="grid grid--4 gap--32">
          {filteredNotes.map((note) => (
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
