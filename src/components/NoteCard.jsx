import PropTypes from "prop-types";
const NoteCard = ({ note, player, handleDeleteNote }) => {
  return (
    <div className="border-[2px] border-black mx-9 my-3 rounded-[20px] px-9 py-4">
      <p className="font-[700]">{note?.date}</p>
      <p className="cursor-pointer" onClick={() => player && typeof player.seekTo === 'function' && player.seekTo(note?.timestamp)}>

        Timestamp :{" "}
        <span className="text-[blue]">
          {note?.timestamp &&
            new Date(note.timestamp * 1000).toISOString().substr(11, 8)}
        </span>
      </p>
      <div className="w-full border-[2px] p-4 rounded-[8px]">
        {<div dangerouslySetInnerHTML={{ __html: note?.content }} />}
      </div>
      <div className="flex gap-[4px] justify-end my-3">
        <button
          onClick={() => handleDeleteNote(note.id)}
          className=" text-[12px] w-[100px] flex justify-center px-2 py-1 rounded-[7px] border-[2px] border-[black] font-semibold"
        >
          Delete Note
        </button>
        <button className=" text-[12px] w-[100px] flex justify-center px-2 py-1 rounded-[7px] border-[2px] border-[black] font-semibold">
          Edit Note
        </button>
      </div>
      <span
        style={{ cursor: "pointer", color: "blue" }}
        //   onClick={() => player.seekTo(note.timestamp)}
      >
        {/* {new Date(note.timestamp * 1000).toISOString().substr(11, 8)} */}
      </span>
      {/* <div>
          {note.image && (
            <img
              src={note.image}
              alt="Note"
              style={{ maxWidth: "100px", display: "block" }}
            />
          )}
        </div> */}
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.object,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default NoteCard;
