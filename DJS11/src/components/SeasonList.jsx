import React from "react";

function SeasonList({ show, onSeasonSelect, onBack }) {
  if (!show || !show.seasons || show.seasons.length === 0) {
    return (
      <div>
        <button onClick={onBack}>Back to Shows</button>
        <h2>{show?.title}</h2>
        <p>No seasons available for this show.</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack}>Back to Shows</button>
      <h2>{show.title}</h2>
      <img src={show.image} alt={show.title} style={{ width: "200px" }} />
      <h3>Seasons</h3>
      <ul>
        {show.seasons.map((season) => (
          <li key={season.id} onClick={() => onSeasonSelect(season)}>
            {season.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeasonList;
