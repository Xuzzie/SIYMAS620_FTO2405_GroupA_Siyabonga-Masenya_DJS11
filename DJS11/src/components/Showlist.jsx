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
    fetch("https://podcast-api.netlify.app") // This is the API to fetch data from
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

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    fetch(`https://podcast-api.netlify.app/shows/${show.id}/seasons`) // Replace with actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeasons(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

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
          <li key={show.id} onClick={() => handleShowSelect(show)}>
            {show.title}
          </li>
        ))}
      </ul>
      {selectedShow && (
        <SeasonList showId={selectedShow.id} seasons={seasons} />
      )}
    </div>
  );
}

export default ShowList;
