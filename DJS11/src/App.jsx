import React, { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
//import PodcastList from "./components/PodcastList.jsx";
import SeasonList from "./components/SeasonList.jsx";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch shows when the component mounts
    fetch("https://podcast-api.netlify.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
  };

  // Filter shows based on the search term
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Podcast App</h1>
      <input
        type="text"
        placeholder="Search for a show..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {selectedShow ? (
        <SeasonList showId={selectedShow.id} seasons={selectedShow.seasons} />
      ) : (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}
      {selectedShow && (
        <button onClick={handleBackToShows}>Back to Shows</button>
      )}
    </div>
  );
}

export default App;
