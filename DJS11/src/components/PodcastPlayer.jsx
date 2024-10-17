import React, { useEffect, useRef, useState } from "react";
import "./PodcastPlayer.css";

const PodcastPlayer = ({ episode, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Effect to reset and play audio when a new episode is selected
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.load(); // Reload audio
      audioRef.current.play(); // Start playing the new episode
      setIsPlaying(true); // Set playing status to true
    }
  }, [episode]);

  // Function to handle closing the player with a confirmation
  const handleClosePlayer = () => {
    if (isPlaying) {
      setShowConfirmation(true); // Show confirmation dialog if audio is playing
    } else {
      onClose(); // Close immediately if not playing
    }
  };

  // Handle confirmation from the user to close the player
  const confirmClose = (confirmed) => {
    if (confirmed) {
      onClose(); // Close the player if user confirms
    }
    setShowConfirmation(false); // Hide the confirmation dialog
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
        onPause={() => setIsPlaying(false)} // Track playing status
        onPlay={() => setIsPlaying(true)} // Track playing status
      >
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={handleClosePlayer}>Close Player</button>
      </div>

      {/* Confirmation dialog when trying to close while audio is playing */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>
            Are you sure you want to close the player while audio is playing?
          </p>
          <button onClick={() => confirmClose(true)}>Yes</button>
          <button onClick={() => confirmClose(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default PodcastPlayer;
