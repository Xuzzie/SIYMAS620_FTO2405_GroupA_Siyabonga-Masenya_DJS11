import React from "react";

function EpisodeList({
  season,
  onEpisodeSelect,
  onFavoriteToggle,
  favorites,
  onBack,
}) {
  if (!season) {
    return null;
  }

  return (
    <div>
      <h2>{season.title}</h2>
      <button onClick={onBack}>Back to Seasons</button>
      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
            <button onClick={() => onEpisodeSelect(episode)}>Play</button>
            <button onClick={() => onFavoriteToggle(episode)}>
              {favorites.some((fav) => fav.id === episode.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
