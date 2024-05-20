import PropTypes from "prop-types";
import HTMLEditor from "./HTMLEditor";
import { useState, useEffect } from "react";
import { getDateString, getTimestampString } from "../utils/functions";

const Notes = ({ videoId, player }) => {
  const [notes, setNotes] = useState([]);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedIndex, setEditedIndex] = useState(0);
  const [noteContent, setNoteContent] = useState("");
  const [openEditor, setOpenEditor] = useState(false);

  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem(`notes-${videoId}`)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`notes-${videoId}`, JSON.stringify(notes));
    }
  }, [notes, videoId]);

  const handleAddNote = () => {
    if (!isEdited && videoId) {
      const currentTime = player.getCurrentTime();
      const newNote = {
        id: Date.now(),
        timestamp: currentTime,
        content: noteContent,
        image: image,
        date: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      setNoteContent("");
    } else if (isEdited) {
      const savedNotes =
        JSON.parse(localStorage.getItem(`notes-${videoId}`)) || [];
      savedNotes[editedIndex].content = noteContent;
      savedNotes[editedIndex].image = image;
      setNotes(savedNotes);
      setIsEdited(false);
      setContent("");
    } else {
      alert("Player is not ready yet.");
    }
    setOpenEditor(false);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleEditor = () => {
    window.scrollTo(0, 0);
    setOpenEditor(true);
  };

  const handleEditNote = (note, index) => {
    setContent(note);
    setEditedIndex(index);
    window.scrollTo(0, 0);
    setIsEdited(true);
    setOpenEditor(true);
  };

  const handleSeekTimestamp = (time) => {
    window.scrollTo(0, 0);
    player.seekTo(time);
  };

  return (
    <>
      <div className=" w-[80%]">
        <div className="w-full border-[2px] my-3 rounded-[20px]">
          <div className="flex pt-5 px-7 pb-[20px] mx-5 border-b-2 border-[gray]">
            <div className="w-[90%]">
              <h1 className="font-[500] text-[20px]"> My Notes</h1>
              <h2>
                All your notes at a single place. Click on any note to go to
                specific timestamp in the video.
              </h2>
            </div>
            <div className="w-[15%]  flex gap-[3px] justify-center items-center">
              <button
                onClick={() => handleEditor()}
                className=" hover:bg-[#5de85d] w-[150px] px-5 py-2 rounded-[7px] border-[2px] border-[black] flex gap-[4px] font-semibold"
              >
                <div className=" font-bold  w-[25px] h-[25px] border-[2px] border-black rounded-full  flex items-center justify-center">
                  +
                </div>
                <span>Add Note</span>
              </button>
            </div>
          </div>
          <div className=" w-[full]">
            <ul>
              {notes.map((note, index) => (
                <div
                  className="border-[2px] hover:bg-[#f5f3f3c4] border-[gray] mx-9 my-3 rounded-[20px] px-9 py-4"
                  key={note.id}
                >
                  <p className="font-[700]">{getDateString(note?.date)}</p>
                  Timestamp
                  <span
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      marginLeft: "3px",
                    }}
                    //  onClick={() => player.seekTo(note?.timestamp)}
                    onClick={() => handleSeekTimestamp(note?.timestamp)}
                  >
                    {getTimestampString(note?.timestamp)}
                  </span>
                  <div className="w-full border-[1px] border-[gray] p-4 rounded-[8px]">
                    {
                      <div
                        dangerouslySetInnerHTML={{ __html: note?.content }}
                      />
                    }
                  </div>
                  <div className="flex gap-[4px] justify-end my-2">
                    <button
                      onClick={() => handleDeleteNote(note?.id)}
                      className=" hover:bg-[red] hover:text-white text-[12px] w-[100px] flex justify-center px-2 py-1 rounded-[7px] border-[2px] border-[black] font-semibold"
                    >
                      Delete Note
                    </button>
                    <button
                      onClick={() => handleEditNote(note, index)}
                      className=" hover:bg-[#5e99ec] hover:text-white text-[12px] w-[100px] flex justify-center px-2 py-1 rounded-[7px] border-[2px] border-[black] font-semibold"
                    >
                      Edit Note
                    </button>
                  </div>
                  <div>
                    {note.image && (
                      <img
                        src={note.image}
                        alt="Note"
                        style={{ maxHeight: "100px", display: "block" }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <input
          style={{ display: "none" }}
          type="text"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note"
        />
      </div>
      {openEditor && (
        <div className="bg-[#5251516b] h-[100vh] w-full absolute top-0 flex justify-center items-center">
          <div className="bg-[white] h-[600px]  w-[800px] rounded-[30px] flex justify-center items-center flex-col">
            <h1 className="text-[25px] font-[700] mb-5">Add a note</h1>
            <HTMLEditor
              value={noteContent}
              onChange={setNoteContent}
              editedText={content}
              setImage={setImage}
            />
            <div>
              <button
                onClick={handleAddNote}
                className="bg-[#6d98f5]  px-5 m-5 py-2 w-[150px] rounded-[10px] font-bold  hover:bg-[#1e2846] hover:text-[white]"
              >
                ADD NOTE
              </button>
              <button
                onClick={() => setOpenEditor(false)}
                className="bg-[#ea3d3d]  px-5 m-5 py-2 w-[150px] rounded-[10px] font-bold  hover:bg-[#883131] hover:text-[white]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Notes.propTypes = {
  videoId: PropTypes.string.isRequired,
  player: PropTypes.shape({
    getCurrentTime: PropTypes.func.isRequired,
    seekTo: PropTypes.func.isRequired,
  }),
};

export default Notes;
