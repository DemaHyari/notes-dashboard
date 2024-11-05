import { useState } from "react";
import { TYPES } from "../types/types";

interface Props {
  noteTypeSelectedHandle?: (
    type: "all" | "personal" | "work" | "study" | "appointment"
  ) => void;
}

const CategorizationFilter = (props: Props) => {
  const [activeType, setActiveType] = useState<
    "all" | "personal" | "work" | "study" | "appointment"
  >("all");
  const { noteTypeSelectedHandle } = props;

  /**
   * Determines the CSS class to apply based on the active type.
   *
   * @param {string} type - The type to check against the active type.
   * @returns {string} - Returns the active CSS class if the type matches the active type, otherwise returns an empty string.
   */
  const activeClassHandler = (type: string) => {
    return activeType === type ? " categorization-filter__button--active" : "";
  };

  /**
   * Handles the selection of a note type.
   *
   * @param {string} type - The type of note to filter by.
   */
  const noteTypeSelectedHandler = (
    type: "all" | "personal" | "work" | "study" | "appointment"
  ) => {
    setActiveType(type);
    noteTypeSelectedHandle?.(type);
  };

  return (
    <div className="categorization-filter flex flex--wrap flex-justify--center gap--16 margin-bottom--24">
      {TYPES.map(
        (type: {
          label: string;
          value: "all" | "personal" | "work" | "study" | "appointment";
        }) => (
          <button
            key={type.value}
            className={
              "button categorization-filter__button categorization-filter__button--" +
              type.value + 
              activeClassHandler(type.value)
            }
            onClick={() => noteTypeSelectedHandler(type.value)}
          >
            {type.label}
          </button>
        )
      )}
    </div>
  );
};

export default CategorizationFilter;
