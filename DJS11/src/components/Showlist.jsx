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
            {/* Render Genres only if genreIds are available and matched */}
            {show.genreIds && show.genreIds.length > 0 && (
              <p>
                Genres:{" "}
                {show.genreIds
                  .map((id) => {
                    const genre = genres.find((genre) => genre.id === id);
                    return genre ? genre.title : null;
                  })
                  .filter((title) => title) // Remove any null values
                  .join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
