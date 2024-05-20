import { useState } from "react";
import PropTypes from "prop-types";

const HTMLEditor = ({ onChange, editedText, setImage }) => {
  const [content, setContent] = useState(editedText.content);
  const [color, setColor] = useState("#000000");
  const [imageSrc, setImageSrc] = useState(null);

  // if ( editedText){
  //   setContent(editedText) ;
  // }
  const handleInputChange = (event) => {
    const value = event.target.value;
    setContent(value);
    onChange(value);
  };

  const applyFormatting = (format, value = null) => {
    const textarea = document.getElementById("editor-textarea");
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = content.substring(selectionStart, selectionEnd);
    console.log(selectedText)
    if (selectedText) {
      const beforeSelection = content.substring(0, selectionStart);
      const afterSelection = content.substring(selectionEnd);
      let formattedText;

      switch (format) {
        case "bold":
          formattedText = `<b>${selectedText}</b>`;
          break;
        case "italic":
          formattedText = `<i>${selectedText}</i>`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "color":
          formattedText = `<span style="color: ${value}">${selectedText}</span>`;
          break;
        default:
          formattedText = selectedText;
          break;
      }

      const updatedContent = beforeSelection + formattedText + afterSelection;
      setContent(updatedContent);
      onChange(updatedContent);
    }
  };


  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
    applyFormatting("color", value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgSrc = reader.result;
        setImageSrc(imgSrc);
        setImage(imgSrc) ;
        const imgTag = `<img src="${imgSrc}" alt="Uploaded Image" />`;
        applyFormatting("image", imgTag);
      };
      reader.readAsDataURL(file);
    }

    console.log(imageSrc)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formatted content:", content);
  };

  return (
    <div className=" border-[1px] w-[700px] border-black p-[10px]">
      <form onSubmit={handleSubmit}>
        <div className=" mb-[10px] flex gap-2">
          <button
            className="bg-[gray] w-[35px] py-1 px-3 rounded-[5px]"
            type="button"
            onClick={() => applyFormatting("bold")}
          >
            <b>B</b>
          </button>
          <button
            className="bg-[gray] w-[35px] py-1 px-3 rounded-[5px]"
            type="button"
            onClick={() => applyFormatting("italic")}
          >
            <i>I</i>
          </button>
          <button
            className="bg-[gray] w-[35px] py-1 px-3 rounded-[5px]"
            type="button"
            onClick={() => applyFormatting("underline")}
          >
            <u>U</u>
          </button>
          <input type="color" value={color} onChange={handleColorChange} />
          <input
            className=" w-[300px]"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <textarea
          value={content}
          className="w-[100%] h-[300px] border-[1px] border-black p-[5px]"
          id="editor-textarea"
          onChange={handleInputChange}
          placeholder="Enter your notes..."
        />
      </form>
      <div className="w-full flex  h-[80px] justify-center">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: "100px", display: "block" }}
          />
        )}
      </div>
    </div>
  );
};

HTMLEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  editedText: PropTypes.shape({
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  setImage:PropTypes.func
};

export default HTMLEditor;
