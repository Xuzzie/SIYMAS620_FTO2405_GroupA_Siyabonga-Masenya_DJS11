// GenreNav.jsx
import React from "react";

const genres = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

function GenreNav({ onGenreSelect, selectedGenre }) {
  return (
    <nav style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      {Object.entries(genres).map(([id, name]) => (
        <button
          key={id}
          onClick={() => onGenreSelect(parseInt(id, 10))}
          style={{
            margin: "5px",
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor:
              selectedGenre === parseInt(id, 10) ? "#007bff" : "#f8f9fa",
            color: selectedGenre === parseInt(id, 10) ? "#fff" : "#000",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {name}
        </button>
      ))}
      <button
        onClick={() => onGenreSelect(null)}
        style={{
          margin: "5px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: selectedGenre === null ? "#007bff" : "#f8f9fa",
          color: selectedGenre === null ? "#fff" : "#000",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        All Genres
      </button>
    </nav>
  );
}

export default GenreNav;
