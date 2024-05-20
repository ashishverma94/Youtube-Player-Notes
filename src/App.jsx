import { useState, useCallback, useEffect } from "react";
import Notes from "./components/Notes";
import YouTubePlayer from "./pages/YoutubePlayer";

function App() {
  const [playId, setPlayId] = useState("");
  const [videoId, setVideoId] = useState("tofc2mtxUpw");
  const [player, setPlayer] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
  });

  const API_KEY = "AIzaSyAnXbqxFhIlPOKEh-N4Iwk0Ubt_V7Fu1wg";

  const fetchVideoDetails = async (id) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet`
    );
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const { title, description } = data.items[0].snippet;
      setVideoDetails({ title, description });
    }
  };

  const handlePlayerReady = useCallback((playerInstance) => {
    setPlayer(playerInstance);
  }, []);

  const [openPopup, setOpenPopup] = useState(false);

  const handlePlayVideo = () => {
    setVideoId(playId);
    setOpenPopup(false);
    fetchVideoDetails(playId);
  };

  useEffect(() => {
    fetchVideoDetails(videoId);
  }, [videoId]);

  return (
    <div className="App">
      <h1 className=" text-[30px] font-[900] mx-[40px] my-[30px]">Video Player with Notes</h1>
      <div className=" flex justify-center flex-col items-center">
        <button
          onClick={() => setOpenPopup(true)}
          className="bg-[#5498e6] my-5 text-white px-6 py-3 rounded-[15px] font-bold"
        >
          Enter Video Id
        </button>

        <YouTubePlayer videoId={videoId} onPlayerReady={handlePlayerReady} />
        <div className=" w-[80%] mt-6 border-b-2 border-[gray] mb-3">
          <h2 className="text-[24px] font-bold py-3">{videoDetails.title}</h2>
          <p className="text-[14px] pb-2">{videoDetails.description}</p>
        </div>
        {player && <Notes videoId={videoId} player={player} />}
      </div>

      {openPopup && (
        <div className="bg-[#5251516b] h-[100vh] w-full absolute top-0 flex justify-center items-center">
          <div className="bg-[white] h-[300px]  w-[600px] rounded-[30px] flex justify-center items-center flex-col">
            <h1 className="text-[25px] font-[700] mb-5">Enter the video ID</h1>
            <input
              className="w-[80%] h-[50px] rounded-[50px] py-3 px-6 border-[3px]"
              type="text"
              value={playId}
              onChange={(e) => setPlayId(e.target.value)}
              placeholder="Enter YouTube Video ID"
            />
            <div>
              <button
                onClick={handlePlayVideo}
                className="bg-[#45ef48] px-5 m-5 py-2 w-[100px] rounded-[10px] font-bold  hover:bg-[#22551f] hover:text-[white]"
              >
                PLAY
              </button>
              <button
                onClick={() => setOpenPopup(false)}
                className="bg-[#f14040] px-5 m-5 py-2 w-[100px] rounded-[10px] font-bold  hover:bg-[#752c2c] hover:text-[white]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
