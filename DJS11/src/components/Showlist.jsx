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
  return (
    <div>
      <h2>Podcast Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id} onClick={() => onShowSelect(show)}>
            <h3>{show.title}</h3>
            <img src={show.image} alt={show.title} />
            <p>{show.description}</p>
            <p>Genres: {show.genreIds.map((id) => genres[id]).join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
