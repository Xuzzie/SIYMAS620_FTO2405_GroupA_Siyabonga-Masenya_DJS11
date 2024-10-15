import React from "react";

function EpisodeList({ seasonId, episodes }) {
  return (
    <div>
      <h3>Episodes for Season {seasonId}</h3>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            {episode.title} - {episode.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
