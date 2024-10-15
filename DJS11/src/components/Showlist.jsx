// ShowList.jsx
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

function ShowList({ shows, onShowSelect }) {
  // Handle cases where `shows` is not an array or is empty
  if (!Array.isArray(shows) || shows.length === 0) {
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
              <img src={show.image} alt={show.title} />
            ) : (
              <p>No image available</p>
            )}
            <p>{show.description}</p>
            <p>
              Genres:{" "}
              {show.genreIds
                ? show.genreIds.map((id) => genres[id]).join(", ")
                : "No genres available"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
