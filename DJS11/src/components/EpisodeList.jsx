import React from "react";
import "./EpisodeList.css";

const EpisodeList = ({
  show,
  seasonIndex,
  onEpisodeSelect,
  onBack,
  onSeasonChange,
  onFavoriteToggle,
  favorites,
}) => {
  const season = show.seasons[seasonIndex];

  // Helper function to check if an episode is favorited
  const isEpisodeFavorited = (episode) => {
    return favorites.some(
      (fav) => fav.id === episode.id && fav.showId === show.id
    );
  };

  const handleNextSeason = () => {
    if (seasonIndex < show.seasons.length - 1) {
      onSeasonChange(seasonIndex + 1);
    }
  };

  const handlePreviousSeason = () => {
    if (seasonIndex > 0) {
      onSeasonChange(seasonIndex - 1);
    }
  };

  return (
    <div className="season-container">
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        Back to Seasons
      </button>

      <h2>{season.title}</h2>

      <div
        className="season-navigation"
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {seasonIndex > 0 && (
          <button onClick={handlePreviousSeason}>Previous Season</button>
        )}
        {seasonIndex < show.seasons.length - 1 && (
          <button onClick={handleNextSeason}>Next Season</button>
        )}
      </div>

      <ul className="episode-list">
        {season.episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <div className="episode-content">
              <div className="episode-header">
                <h3>{episode.title}</h3>
                <button
                  className={`favorite-button ${
                    isEpisodeFavorited(episode) ? "favorited" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(episode, show.id, season);
                  }}
                >
                  {isEpisodeFavorited(episode) ? "❤️" : "🤍"}
                </button>
              </div>
              <p>{episode.description}</p>
              <button
                className="play-button"
                onClick={() => onEpisodeSelect(episode)}
              >
                Play
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
