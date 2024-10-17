import React from "react";
import "./EpisodeList.css"; // Assuming this file contains necessary styles

const EpisodeList = ({
  show, // Pass the entire show object with all seasons
  seasonIndex, // Pass the current season index
  onEpisodeSelect,
  onBack,
  onSeasonChange, // Callback to update the current season index
}) => {
  const season = show.seasons[seasonIndex];

  const handleNextSeason = () => {
    if (seasonIndex < show.seasons.length - 1) {
      onSeasonChange(seasonIndex + 1); // Move to next season
    }
  };

  const handlePreviousSeason = () => {
    if (seasonIndex > 0) {
      onSeasonChange(seasonIndex - 1); // Move to previous season
    }
  };

  return (
    <div className="season-container">
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        Back to Seasons
      </button>

      <h2>{season.title}</h2>

      {/* Center the season navigation buttons */}
      <div
        className="season-navigation"
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center", // Center the buttons horizontally
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

      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <div>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
            </div>
            <button onClick={() => onEpisodeSelect(episode)}>Play</button>
            {/* Favorite button has been removed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
