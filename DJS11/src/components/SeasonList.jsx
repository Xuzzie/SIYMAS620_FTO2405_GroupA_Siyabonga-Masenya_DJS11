import React from "react";

import EpisodeList from "./EpisodeList"; // Import your EpisodeList component
function SeasonList({ showId, seasons }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  if (!Array.isArray(seasons)) {
    return <p>No seasons available</p>; // Handle if seasons is not an array
  }

  return (
    <div>
      <h2>Seasons</h2>
      <ul>
        {seasons.map((season) => (
          <li key={season.id} onClick={() => setSelectedSeason(season)}>
            {season.title}
          </li>
        ))}
      </ul>
      {selectedSeason && (
        <EpisodeList
          seasonId={selectedSeason.id}
          episodes={selectedSeason.episodes}
        />
      )}
    </div>
  );
}

export default SeasonList;
