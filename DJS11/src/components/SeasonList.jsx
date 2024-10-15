import React, { useEffect, useState } from "react";
import EpisodeList from "./EpisodeList"; // Import the EpisodeList component

function SeasonList({ showId, seasons }) {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
    setLoading(true);
    setError(null);

    // Fetch episodes for the selected season
    fetch(
      `https://podcast-api.netlify.app/shows/${showId}/seasons/${season.id}/episodes`
    ) // Replace with actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEpisodes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>Seasons</h3>
      <ul>
        {seasons.map((season) => (
          <li key={season.id} onClick={() => handleSeasonSelect(season)}>
            {season.title} (Episodes: {season.episodeCount})
          </li>
        ))}
      </ul>

      {loading && <p>Loading episodes...</p>}
      {error && <p>Error: {error.message}</p>}
      {selectedSeason && <EpisodeList episodes={episodes} />}
    </div>
  );
}

export default SeasonList;
