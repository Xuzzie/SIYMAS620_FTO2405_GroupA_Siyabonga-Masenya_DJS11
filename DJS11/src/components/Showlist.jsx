import React from "react";

function ShowList({ shows, onShowSelect }) {
  return (
    <div>
      <h2>Podcast Shows</h2>
      {shows.length === 0 ? (
        <p>No shows found.</p>
      ) : (
        <ul>
          {shows.map((show) => (
            <li key={show.id} onClick={() => onShowSelect(show)}>
              {show.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowList;
