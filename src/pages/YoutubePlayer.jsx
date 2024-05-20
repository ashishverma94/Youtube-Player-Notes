import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const YouTubePlayer = ({ videoId, onPlayerReady }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = () => {
      if (window.YT) {
        if (playerRef.current) {
          playerRef.current.loadVideoById(videoId);
        } else {
          playerRef.current = new window.YT.Player("player", {
            height: "390",
            width: "640",
            videoId: videoId,
            playerVars: {
              modestbranding: 1,
              controls: 1,
              showinfo: 1,
              rel: 0,
              fs: 1,
              iv_load_policy: 3,
              playsinline: 1,
            },
            events: {
              onReady: (event) => onPlayerReady(event.target),
            },
          });
        }
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = loadPlayer;
    } else {
      loadPlayer();
    }
  }, [videoId, onPlayerReady]);

  return <div id="player"></div>;
};

YouTubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  onPlayerReady: PropTypes.func.isRequired,
};

export default YouTubePlayer;
