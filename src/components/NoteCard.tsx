import { Note } from "../types/note.interface";
import { dateFormatter } from "../utils/helpers/dateFormatter.helper";

interface Props {
  note: Note;
  editNoteHandler?: (note: Note) => void;
}

const NoteCard = (props: Props) => {
  const { note, editNoteHandler } = props;

  /**
   * Handles the editing of a note.
   *
   * @param note - The note object to be edited.
   */
  const editHandler = (note: Note) => {
    editNoteHandler?.(note);
  };

  return (
    <div className="notes-block flex flex-direction--column flex-justify--between" onClick={() => editHandler(note)}>
      <h3 className="notes-block__title">{note.title}</h3>
      <p className="notes-block__text margin-bottom--20">{note.description}</p>
      <div className="flex flex-align--center flex-justify--between gap--12">
        <span className="notes-block__date">
          {dateFormatter(note.updatedAt as string)}
        </span>
        <span
          className={"notes-block__type notes-block__type--" + note.type}
        ></span>
      </div>
    </div>
  );
};

export default NoteCard;
