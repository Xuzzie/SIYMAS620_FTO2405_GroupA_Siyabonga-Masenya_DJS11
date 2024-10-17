// This code works

import React from "react";
import "./GenreNav.css"; // Create this CSS file for styling

function GenreNav({ genres, onGenreSelect, selectedGenre }) {
  if (!genres.length) {
    return <p>Loading genres...</p>;
  }

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
            }`}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name ? genre.name : genre.title}{" "}
            {/* Ensure correct property */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GenreNav;
