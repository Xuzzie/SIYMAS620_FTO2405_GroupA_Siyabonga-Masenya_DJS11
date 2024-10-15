import React from "react";

function EpisodeList({ season, onBack }) {
  return (
    <div>
      <button onClick={onBack}>Back to Seasons</button>
      <h3>Episodes for {season.title}</h3>
      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.id}>
            <h4>{episode.title}</h4>
            <p>{episode.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
