import React from "react";
import EpisodeList from "./EpisodeList.jsx";

function SeasonList({ showId, seasons }) {
  return (
    <div>
      <h3>Seasons for Show ID: {showId}</h3>
      {seasons.length === 0 ? (
        <p>No seasons available for this show.</p>
      ) : (
        <ul>
          {seasons.map((season) => (
            <li key={season.id}>
              <strong>{season.title}</strong>
              {season.episodes && season.episodes.length > 0 && (
                <ul>
                  {season.episodes.map((episode) => (
                    <li key={episode.id}>{episode.title}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SeasonList;
