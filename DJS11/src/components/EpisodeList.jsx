import React from "react";
import "./EpisodeList.css";

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

// Sample Usage
// Assuming season is an object with a title and episodes array, e.g., { title: "Season 1", episodes: [{ id: 1, title: "Episode 1", description: "Description 1" }, { id: 2, title: "Episode 2", description: "Description 2" }, ...] }
// <EpisodeList season={season} onEpisodeSelect={handleEpisodeSelect} onFavoriteToggle={handleFavoriteToggle} favorites={favorites} />

/* EpisodeList.css file
.episode-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.heart-icon {
  font-size: 24px;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;
}

.heart-icon.red {
  color: red;
}

.heart-icon:hover {
  transform: scale(1.2);
}
*/
