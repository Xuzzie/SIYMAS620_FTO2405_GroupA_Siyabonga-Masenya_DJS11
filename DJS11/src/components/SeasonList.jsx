import React, { useState } from "react";
import EpisodeList from "./EpisodeList";

function SeasonList({ show, onBack }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  return (
    <div>
      <button onClick={onBack}>Back to Shows</button>
      <h2>{show.title} - Seasons</h2>
      {!selectedSeason ? (
        <ul>
          {show.seasons.map((season) => (
            <li key={season.id} onClick={() => handleSeasonSelect(season)}>
              {season.title}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <EpisodeList
            season={selectedSeason}
            onBack={() => setSelectedSeason(null)}
          />
        </>
      )}
    </div>
  );
}

export default SeasonList;
