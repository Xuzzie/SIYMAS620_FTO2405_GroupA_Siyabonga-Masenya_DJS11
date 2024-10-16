import React from "react";

function ShowList({ shows, genres, onShowSelect }) {
  if (!shows.length) {
    return <p>No shows available at the moment. Please try again later.</p>;
  }

  return (
    <div>
      <h2>Podcast Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id} onClick={() => onShowSelect(show)}>
            <h3>{show.title}</h3>
            {show.image ? (
              <img
                src={show.image}
                alt={show.title}
                style={{ width: "200px" }}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>{show.description}</p>
            <p>
              Genres:{" "}
              {show.genreIds && show.genreIds.length > 0
                ? show.genreIds
                    .map((id) => genres[id] || "Unknown Genre")
                    .join(", ")
                : "No genres available"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
