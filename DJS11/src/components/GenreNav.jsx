import React, { useState, useEffect } from "react";
import "./GenreNav.css";

function GenreNav({ genres, onGenreSelect, selectedGenre, favoriteCount }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedGenre || "All Genres"
  );

  // Toggle between dropdown and list depending on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsDropdown(true); // Switch to dropdown on small/medium screens
      } else {
        setIsDropdown(false); // Use list on larger screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!genres.length) {
    return <p>Loading genres...</p>;
  }

  const getGenreDisplayName = (genre) => {
    if (genre.id === "favorites") {
      return `Favorites ${favoriteCount ? `(${favoriteCount})` : ""}`;
    }
    return genre.name || genre.title;
  };

  const handleGenreChange = (e) => {
    const selectedGenreId =
      e.target.value === "All Genres" ? null : Number(e.target.value); // Ensure the genre ID is passed as a number

    setSelectedOption(e.target.value);
    onGenreSelect(selectedGenreId);
  };

  return (
    <nav>
      <h2>Genres</h2>
      {isDropdown ? (
        // Dropdown for small/medium screens
        <select
          className="genre-dropdown"
          value={selectedOption}
          onChange={handleGenreChange}
        >
          <option value="All Genres">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {getGenreDisplayName(genre)}
            </option>
          ))}
        </select>
      ) : (
        // List for larger screens
        <ul className="genre-list">
          <li
            className={`genre-item ${selectedGenre === null ? "active" : ""}`}
            onClick={() => onGenreSelect(null)}
          >
            All Genres
          </li>
          {genres.map((genre) => (
            <li
              key={genre.id}
              className={`genre-item ${
                selectedGenre === genre.id ? "active" : ""
              } ${genre.id === "favorites" ? "favorites-genre" : ""}`}
              onClick={() => onGenreSelect(genre.id)}
            >
              {getGenreDisplayName(genre)}
              {genre.id === "favorites" && (
                <span className="favorite-indicator">❤️</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default GenreNav;
