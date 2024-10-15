import React, { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
//import PodcastList from "./components/PodcastList.jsx";
import SeasonList from "./components/SeasonList.jsx";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    // Fetch shows from the API
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSeasons(show.seasons); // Assuming the API returns seasons with shows
  };

  const handleSeasonSelect = (season) => {
    // Handle what happens when a season is selected
    console.log("Selected season:", season);
    // Here, you can implement the logic to fetch episodes for the selected season
  };

  return (
    <div>
      <ShowList shows={shows} onShowSelect={handleShowSelect} />
      {selectedShow && (
        <SeasonList seasons={seasons} onSeasonSelect={handleSeasonSelect} />
      )}
    </div>
  );
}

export default App;
