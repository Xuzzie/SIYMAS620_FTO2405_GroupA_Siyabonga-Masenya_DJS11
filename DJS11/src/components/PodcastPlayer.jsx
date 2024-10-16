import React, { useEffect, useRef } from "react";

const PodcastPlayer = ({ episode, onClose }) => {
  const audioRef = useRef(null); // Use ref to access the audio element

  // Effect to reset and play audio when a new episode is selected
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.load(); // Reload audio
      audioRef.current.play(); // Start playing the new episode
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

      <audio
        controls
        autoPlay
        key={episode.id} // Add key to force React to treat it as a new element
        ref={audioRef} // Set the reference for controlling the audio
        style={{ width: "300px" }}
      >
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
