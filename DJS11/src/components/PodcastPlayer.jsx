import React, { useEffect, useRef } from "react";

const PodcastPlayer = ({ episode, onClose, onFavoriteToggle, favorites }) => {
  const audioRef = useRef(null); // Use ref to access the audio element

  // Check if the current episode is in favorites
  const isFavorite = favorites.some((fav) => fav.id === episode.id);

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
        left: "0", // Ensure the player starts from the left edge of the screen
        right: "0", // Ensure the player extends to the right edge of the screen
        margin: "0 auto", // Center the content horizontally
        maxWidth: "1200px", // Set a max width for the player
        width: "100%", // Take up full width
        backgroundColor: "#282828",
        color: "#fff",
        padding: "10px 20px", // Add padding for better appearance
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0 }}>{episode.title}</p>
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

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle(episode)}
          style={{
            backgroundColor: isFavorite ? "red" : "#1db954", // Change color based on favorite status
            border: "none",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>

        {/* Close Player Button */}
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
    </div>
  );
};

export default PodcastPlayer;
