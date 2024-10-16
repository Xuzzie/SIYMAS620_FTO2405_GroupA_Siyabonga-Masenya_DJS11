import React, { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
import SeasonList from "./components/SeasonList";
import GenreNav from "./components/GenreNav"; // Import the new GenreNav component
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Fetch previews when the component mounts
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  const handleShowSelect = (show) => {
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedShow(data);
      })
      .catch((error) => console.error("Error fetching show details:", error));
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
  };

  // Filter shows based on the search term and selected genre
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      // Ensure show.genreIds exists and has values
      if (selectedGenre) {
        return show.genreIds && show.genreIds.includes(selectedGenre);
      }
      return true; // If no genre is selected, show all
    });

  return (
    <div>
      <h1>Podcast App</h1>
      <GenreNav
        onGenreSelect={setSelectedGenre}
        selectedGenre={selectedGenre}
      />
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
          <SeasonList showId={selectedShow.id} seasons={selectedShow.seasons} />
          <button onClick={handleBackToShows}>Back to Shows</button>
        </>
      ) : (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}
    </div>
  );
}

export default App;
