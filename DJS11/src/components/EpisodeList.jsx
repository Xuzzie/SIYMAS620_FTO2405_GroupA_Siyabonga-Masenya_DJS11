import React from "react";

function EpisodeList({ episodes }) {
  return (
    <div>
      <h4>Episodes</h4>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <strong>{episode.title}</strong> - {episode.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
