import React from "react";

function EpisodeList({ season, onBack }) {
  if (!season || !season.episodes || season.episodes.length === 0) {
    return (
      <div>
        <button onClick={onBack}>Back to Seasons</button>
        <h3>{season?.title}</h3>
        <p>No episodes available for this season.</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack}>Back to Seasons</button>
      <h3>{season.title} - Episodes</h3>
      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.id}>
            <p>{episode.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
