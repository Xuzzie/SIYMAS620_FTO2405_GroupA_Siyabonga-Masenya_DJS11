import React, { useEffect, useState } from "react";
import SeasonList from "./SeasonList";

function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("https://podcast-api.netlify.app") // this is the API in which we will fetch data from
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Podcast Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {/* Display show image, title, number of seasons, and last updated date */}
            {show.imageUrl && <img src={show.imageUrl} alt={show.title} />}
            <strong>{show.title}</strong>
            {show.numberOfSeasons !== undefined && (
              <span> - {show.numberOfSeasons} seasons</span>
            )}
            {show.lastUpdated && (
              <span>
                {" "}
                - Last updated:{" "}
                {new Date(show.lastUpdated).toLocaleDateString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
