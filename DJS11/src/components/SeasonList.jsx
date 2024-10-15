import React from "react";

function SeasonList({ showId, seasons }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  // Handle cases where `seasons` is empty or not defined
  if (!seasons || seasons.length === 0) {
    return <p>No seasons available for this show.</p>;
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
