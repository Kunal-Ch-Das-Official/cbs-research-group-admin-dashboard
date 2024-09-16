import { Editor } from "primereact/editor";
import PropTypes from "prop-types";
const TextEditor = ({ editorLabel, eventValue, eventHandler }) => {
  return (
    <div className="mt-2">
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {editorLabel}
      </label>
      <div className="card" id="alumni-details">
        <Editor
          className="bg-white"
          value={eventValue}
          onTextChange={(e) => eventHandler(e.textValue)}
          style={{ height: "220px" }}
        />
      </div>
    </div>
  );
};

TextEditor.propTypes = {
  editorLabel: PropTypes.string,
  eventValue: PropTypes.any,
  eventHandler: PropTypes.any,
};

export default TextEditor;
