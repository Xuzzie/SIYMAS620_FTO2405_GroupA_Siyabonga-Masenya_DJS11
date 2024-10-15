import React from "react";

function SeasonList({ seasons, onSeasonSelect }) {
  return (
    <div>
      <h3>Seasons</h3>
      {seasons.length === 0 ? (
        <p>No seasons available for this show.</p>
      ) : (
        <ul>
          {seasons.map((season) => (
            <li key={season.id} onClick={() => onSeasonSelect(season)}>
              {season.title} (Episodes: {season.episodeCount})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SeasonList;
