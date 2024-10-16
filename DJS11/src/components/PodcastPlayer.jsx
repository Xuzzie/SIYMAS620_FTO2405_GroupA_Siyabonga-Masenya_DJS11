import React, { useEffect } from "react";

const PodcastPlayer = ({ episode, onClose }) => {
  // If no episode is selected, don't render the player
  if (!episode) {
    return null;
  }

  useEffect(() => {
    // Auto-play the audio when a new episode is selected
    const audio = document.getElementById("audio-player");
    if (audio) {
      audio.play();
    }
  }, [episode]);

  return (
    <div
      className="podcast-player-bar"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#282828",
        color: "#fff",
        padding: "10px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{episode.title}</p>
      </div>

      <audio id="audio-player" controls autoPlay style={{ width: "300px" }}>
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Close Player
      </button>
    </div>
  );
};

export default PodcastPlayer;
