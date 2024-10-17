import React from "react";

function SeasonList({
  show,
  onSeasonSelect,
  onBack,
  onFavoriteToggle,
  favorites,
}) {
  if (!show || !show.seasons || show.seasons.length === 0) {
    return (
      <div>
        <button onClick={onBack}>Back to Shows</button>
        <h2>{show?.title}</h2>
        <p>No seasons available for this show.</p>
      </div>
    );
  }

  // Helper function to check if the show is already favorited
  const isShowFavorited = favorites.some((fav) => fav.id === show.id);

  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      {/* Center content */}
      <button onClick={onBack} className="back-button">
        Back to Shows
      </button>
      <h2>{show.title}</h2>
      {/* Center the image */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={show.image}
          alt={show.title}
          style={{ width: "200px", marginBottom: "10px" }}
        />

        {/* Favorite show button directly below the image */}
        <button
          className={`favorite-show-button ${
            isShowFavorited ? "favorited" : ""
          }`}
          onClick={() => onFavoriteToggle(show)}
          style={{ marginTop: "10px" }}
        >
          {isShowFavorited ? "Unfavorite Show" : "Favorite Show"}
        </button>
      </div>
      <h3>Seasons</h3>
      <ul>
        {show.seasons.map((season) => (
          <li key={season.id} onClick={() => onSeasonSelect(season)}>
            {season.title} ({season.episodes.length} EP)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeasonList;

//cemtre
