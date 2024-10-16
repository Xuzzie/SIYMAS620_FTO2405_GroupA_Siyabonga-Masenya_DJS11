import React from "react";

const EpisodeList = ({ season, onEpisodeSelect }) => {
  return (
    <div>
      <h2>{season.title}</h2>
      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <div>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
            </div>
            <button onClick={() => onEpisodeSelect(episode)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
