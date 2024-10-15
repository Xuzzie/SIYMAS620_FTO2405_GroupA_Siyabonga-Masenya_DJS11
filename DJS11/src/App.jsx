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
    // Fetch previews when the component mounts
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  const handleShowSelect = (show) => {
    // Fetch detailed show data using the selected show's ID
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedShow(data); // Set the selected show with its seasons and episodes
      })
      .catch((error) => console.error("Error fetching show details:", error));
  };

  const handleBackToShows = () => {
    setSelectedShow(null); // Reset the selected show to return to the show list
  };

  // Filter shows based on the search term
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
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
        <>
          <SeasonList show={selectedShow} onBack={handleBackToShows} />
        </>
      ) : (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}
    </div>
  );
}

export default App;
