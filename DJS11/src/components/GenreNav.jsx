import React from "react";
import "./GenreNav.css";

function GenreNav({ genres, onGenreSelect, selectedGenre, favoriteCount }) {
  if (!genres.length) {
    return <p>Loading genres...</p>;
  }

  // Helper function to get the display name for a genre
  const getGenreDisplayName = (genre) => {
    if (genre.id === "favorites") {
      return `Favorites ${favoriteCount ? `(${favoriteCount})` : ""}`;
    }
    return genre.name || genre.title;
  };

  return (
    <nav>
      <h2>Genres</h2>
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
    </nav>
  );
}

export default GenreNav;
