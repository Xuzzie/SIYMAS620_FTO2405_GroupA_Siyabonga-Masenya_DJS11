//working code

import React from "react";

const EpisodeList = ({
  season,
  onEpisodeSelect,
  onFavoriteToggle,
  favorites,
}) => {
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
            <i
              className={`heart-icon ${
                favorites.some((fav) => fav.id === episode.id) ? "red" : ""
              }`}
              onClick={() => onFavoriteToggle(episode)}
            >
              ♥
            </i>
            <button onClick={() => onEpisodeSelect(episode)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
