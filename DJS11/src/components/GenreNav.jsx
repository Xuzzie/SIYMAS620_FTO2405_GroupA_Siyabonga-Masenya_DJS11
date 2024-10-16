import React from "react";

function GenreNav({ genres, onGenreSelect, selectedGenre }) {
  if (!genres.length) {
    return <p>Loading genres...</p>;
  }

  return (
    <nav>
      <h2>Genres</h2>
      <ul
        style={{
          display: "flex",
          gap: "10px",
          cursor: "pointer",
          listStyle: "none",
          padding: "0",
        }}
      >
        <li
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: selectedGenre === null ? "#d4d4d4" : "#e6e6e6",
            fontWeight: selectedGenre === null ? "bold" : "normal",
            textDecoration: selectedGenre === null ? "underline" : "none",
          }}
          onClick={() => onGenreSelect(null)}
        >
          All Genres
        </li>
        {genres.map((genre) => (
          <li
            key={genre.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor:
                selectedGenre === genre.id ? "#d4d4d4" : "#e6e6e6",
              fontWeight: selectedGenre === genre.id ? "bold" : "normal",
              textDecoration: selectedGenre === genre.id ? "underline" : "none",
            }}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GenreNav;
