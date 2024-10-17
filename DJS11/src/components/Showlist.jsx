import React from "react";

function ShowList({ shows, genres, onShowSelect }) {
  if (!shows.length) {
    return <p>No shows available at the moment. Please try again later.</p>;
  }

  // Sort the shows alphabetically by title
  const sortedShows = [...shows].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <h2>Podcast Shows</h2>
      <div className="show-list">
        {sortedShows.map((show) => (
          <div
            key={show.id}
            className="show-item"
            onClick={() => onShowSelect(show)}
          >
            <h3 className="show-title">{show.title}</h3>

            {/* Add a subheading for seasons with the same class as the title */}
            <p className="show-title show-seasons">
              {show.seasons && show.seasons.length > 0
                ? `${show.seasons.length} Seasons`
                : "No Seasons Available"}
            </p>

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
