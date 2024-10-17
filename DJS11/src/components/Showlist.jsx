import React, { useState } from "react";

function ShowList({ shows, genres, onShowSelect }) {
  const [sortOption, setSortOption] = useState("a-z"); // Default sort option

  if (!shows.length) {
    return <p>No shows available at the moment. Please try again later.</p>;
  }

  // Function to handle sorting logic
  const handleSort = (shows, option) => {
    switch (option) {
      case "a-z":
        return [...shows].sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return [...shows].sort((a, b) => b.title.localeCompare(a.title));
      case "new-to-old":
        return [...shows].sort((a, b) => {
          const dateA = new Date(b.releaseDate);
          const dateB = new Date(a.releaseDate);
          return isNaN(dateA) || isNaN(dateB) ? 0 : dateA - dateB;
        });
      case "old-to-new":
        return [...shows].sort((a, b) => {
          const dateA = new Date(a.releaseDate);
          const dateB = new Date(b.releaseDate);
          return isNaN(dateA) || isNaN(dateB) ? 0 : dateA - dateB;
        });
      default:
        return shows;
    }
  };

  // Get sorted shows based on the selected option
  const sortedShows = handleSort(shows, sortOption);

  return (
    <div>
      <h2>Podcast Shows</h2>

      {/* Dropdown for sorting */}
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="new-to-old">New to Old</option>
          <option value="old-to-new">Old to New</option>
        </select>
      </div>

      <div className="show-list" style={{ marginTop: "20px" }}>
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
