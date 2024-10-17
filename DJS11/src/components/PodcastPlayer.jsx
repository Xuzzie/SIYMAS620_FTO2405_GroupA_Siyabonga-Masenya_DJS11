import React, { useEffect, useRef } from "react";
import "./PodcastPlayer.css";

const PodcastPlayer = ({ episode, onClose, onFavoriteToggle, favorites }) => {
  const audioRef = useRef(null);

  // Check if the current episode is in the favorites
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

  // Function to toggle favorite status and update state
  const handleFavoriteToggle = () => {
    onFavoriteToggle(episode); // This should add/remove the episode from favorites
  };

  return (
    <div className="podcast-player-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{episode.title}</p>
      </div>

      <audio
        controls
        autoPlay
        ref={audioRef} // Set the reference for controlling the audio
        style={{ width: "300px" }}
      >
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Favorite Button */}
        <button
          className={`favorite-button ${isFavorite ? "favorite" : ""}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>

        <button onClick={onClose}>Close Player</button>
      </div>
    </div>
  );
};

export default PodcastPlayer;
