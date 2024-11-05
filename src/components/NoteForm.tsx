import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Note } from "../types/note.interface";
import { addNote, deleteNote, editNote } from "../store/notesSlice";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { TYPES } from "../types/types";

interface Props {
  existingNote?: Note | null;
  closeModalHandler?: () => void;
}

const NoteForm = (props: Props) => {
  const { existingNote, closeModalHandler } = props;
  const dispatch = useDispatch();

  const [noteData, setNoteData] = useState<Note>(
    existingNote || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      type: "personal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const deleteNoteHandler = (id: string) => {
    dispatch(deleteNote(id));
    closeModalHandler?.();
  };

  /**
   * Handles changes to input fields and updates the note data state.
   *
   * @param e - The change event triggered by input, textarea, select elements, or a custom SelectButtonChangeEvent.
   * @returns void
   */
  const changeHandler = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectButtonChangeEvent
  ) => {
    const { name, value } = e.target;

    setNoteData({
      ...noteData,
      [name]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  /**
   * Handles the form submission event.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {void}
   * 
   * This function prevents the default form submission behavior, sets the submission state to true,
   * and checks if the note data has a title or description. If both are missing, it returns early.
   * If an existing note is being edited, it dispatches the editNote action with the note data.
   * Otherwise, it dispatches the addNote action with the note data. Finally, it calls the closeModalHandler
   * function if it exists.
   */
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!noteData.title && !noteData.description) return;

    if (existingNote) {
      dispatch(editNote(noteData));
    } else {
      dispatch(addNote(noteData));
    }
    closeModalHandler?.();
  };

  useEffect(() => {
    if (existingNote) setNoteData(existingNote);
  }, [existingNote]);

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group margin-bottom--24">
        <label className="form-group__label margin-bottom--8" htmlFor="title">
          Title:
        </label>
        <InputText
          name="title"
          value={noteData.title}
          onChange={changeHandler}
        />
        {isSubmitted && !noteData.title && (
          <small className="form-group__error margin-top--8">Title is required.</small>
        )}
      </div>
      <div className="form-group margin-bottom--24">
        <label
          className="form-group__label margin-bottom--8"
          htmlFor="description"
        >
          Description:
        </label>
        <InputTextarea
          rows={22}
          name="description"
          value={noteData.description}
          onChange={changeHandler}
        />
        {isSubmitted && !noteData.description && (
          <small className="form-group__error margin-top--8">Description is required.</small>
        )}
      </div>
      <div className="form-group margin-bottom--24">
        <label className="form-group__label margin-bottom--8" htmlFor="type">
          Type:
        </label>
        <SelectButton
          name="type"
          optionLabel="label"
          optionValue="value"
          value={noteData.type}
          options={TYPES.slice(1)}
          onChange={changeHandler}
        />
      </div>
      <div className="flex flex-align--center gap--12">
        <button className="button button--linear" type="submit">
          Save Note
        </button>
        {existingNote && (
          <button
            className="button button--linear"
            type="button"
            onClick={() => deleteNoteHandler(existingNote.id)}
          >
            Delete Note
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
