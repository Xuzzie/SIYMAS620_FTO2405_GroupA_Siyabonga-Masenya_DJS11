import React from "react";

function PodcastPlayer({ episode, onClose }) {
  if (!episode) return null;

  console.log("Playing episode:", episode);

  return (
    <div className="podcast-player">
      <h3>Now Playing: {episode.title}</h3>
      <div className="player-controls">
        <button>Play</button>
        <button>Pause</button>
        <input type="range" min="0" max="100" />
        <button onClick={onClose}>Close Player</button>
      </div>
    </div>
  );
}

export default PodcastPlayer;
