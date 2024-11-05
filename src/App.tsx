import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Modal from "./components/shared/Modal";
import { Note } from "./types/note.interface";
import CategorizationFilter from "./components/CategorizationFilter";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeType, setActiveType] = useState<"all" | "personal" | "work" | "study" | "appointment">("all");

  const editNoteHandler = (note: Note) => {
    setIsModalVisible(true);
    setSelectedNote(note);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const closeModalHandler = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedNote(null);
  };

  const setActiveTypeHandler = (type: "all" | "personal" | "work" | "study" | "appointment") => {
    setActiveType(type);
  };

  useEffect(() => {
    if (!showSearch) setSearchValue("");
  }, [showSearch]);
  return (
    <section className="notes-conteiner">
      <header className="flex flex-align--center gap--16 margin-bottom--32">
        <div className="notes-header flex flex-justify--between flex-align--center">
          {showSearch ? (
            <input
              className="notes-header__search"
              type="text"
              autoFocus
              onChange={searchHandler}
              placeholder="Note..."
            />
          ) : (
            <h2 className="notes-header__title">My Notes</h2>
          )}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="notes-header__button button button--linear flex flex-justify--center flex-align--center"
          >
            <i className={showSearch ? "pi pi-times" : "pi pi-search"}></i>
          </button>
        </div>
        <button
          onClick={() => setIsModalVisible(!isModalVisible)}
          className="notes-header__button button button--linear flex flex-justify--center flex-align--center"
        >
          <i className="pi pi-plus-circle"></i>
        </button>
      </header>
      <CategorizationFilter noteTypeSelectedHandle={setActiveTypeHandler} />
      <NotesList editNoteHandler={editNoteHandler} searchValue={searchValue} activeType={activeType} />
      <Modal
        header="Modal Header"
        visible={isModalVisible}
        onHide={closeModalHandler}
        position="right"
        height="100vh"
      >
        <NoteForm
          existingNote={selectedNote}
          closeModalHandler={closeModalHandler}
        />
      </Modal>
    </section>
  );
};
export default App;
