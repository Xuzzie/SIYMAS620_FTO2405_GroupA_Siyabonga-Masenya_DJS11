import React from "react";

function ShowList({ shows, genres, onShowSelect }) {
  if (!shows.length) {
    return <p>No shows available at the moment. Please try again later.</p>;
  }

  return (
    <div>
      <h2>Podcast Shows</h2>
      <div className="show-list">
        {shows.map((show) => (
          <div
            key={show.id}
            className="show-item"
            onClick={() => onShowSelect(show)}
          >
            <h3 className="show-title">{show.title}</h3>
            {show.image ? (
              <img src={show.image} alt={show.title} className="show-image" />
            ) : (
              <p>No image available</p>
            )}
            <p className="show-description">{show.description}</p>
            {show.genreIds && show.genreIds.length > 0 && (
              <p className="show-genres">
                Genres:{" "}
                {show.genreIds
                  .map((id) => {
                    const genre = genres.find((genre) => genre.id === id);
                    return genre ? genre.title : null;
                  })
                  .filter((title) => title)
                  .join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
