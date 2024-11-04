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
  onFormSubmit?: () => void;
}

const NoteForm = (props: Props) => {
  const { existingNote, onFormSubmit } = props;
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

  const deleteNoteHandler = (id: string) => {
    dispatch(deleteNote(id));
  };

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (noteData.title && noteData.description) {
      if (existingNote) {
        dispatch(editNote(noteData));
      } else {
        dispatch(addNote(noteData));
      }
      onFormSubmit?.();
    } else {
      alert("Please fill in all fields");
    }
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
          required
        />
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
          options={TYPES}
          onChange={changeHandler}
        ></SelectButton>
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
