import React, { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
//import PodcastList from "./components/PodcastList.jsx";
import SeasonList from "./components/SeasonList.jsx";
import "./App.css";
function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch previews when the component mounts
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Shows:", data); // Log fetched data
        setShows(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleShowSelect = (show) => {
    // Fetch detailed show data using the selected show's ID
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Selected Show Details:", data); // Log the selected show data
        setSelectedShow(data);
      })
      .catch((error) => console.error("Error fetching show details:", error));
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
  };

  // Filter shows based on the search term
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display loading message if data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

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
