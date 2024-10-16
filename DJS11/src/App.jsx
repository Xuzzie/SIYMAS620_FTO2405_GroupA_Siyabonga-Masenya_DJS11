import React, { useEffect, useState } from "react";
import ShowList from "./components/Showlist";
import SeasonList from "./components/SeasonList";
import EpisodeList from "./components/EpisodeList";
import GenreNav from "./components/GenreNav";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch show previews and genre data
  useEffect(() => {
    const fetchShowsAndGenres = async () => {
      try {
        // Fetch all show previews
        const showResponse = await fetch("https://podcast-api.netlify.app");
        const showData = await showResponse.json();
        setShows(showData);

        // Fetch all genres
        const genrePromises = Array.from({ length: 9 }, (_, i) =>
          fetch(`https://podcast-api.netlify.app/genre/${i + 1}`).then((res) =>
            res.json()
          )
        );

        const genreData = await Promise.all(genrePromises);
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching shows or genres:", error);
      }
    };

    fetchShowsAndGenres();
  }, []);

  const handleShowSelect = (show) => {
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedShow(data);
      })
      .catch((error) => console.error("Error fetching show details:", error));
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  const handleBackToSeasons = () => {
    setSelectedSeason(null);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Filter shows based on the selected genre and search term
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      if (selectedGenre) {
        const genre = genres.find((g) => g.id === selectedGenre);
        return genre?.shows?.includes(show.id.toString());
      }
      return true;
    });

  return (
    <div className="container">
      <h1>Podcast App</h1>
      <input
        type="text"
        placeholder="Search for a show..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <GenreNav
        genres={genres}
        onGenreSelect={handleGenreSelect}
        selectedGenre={selectedGenre}
      />
      {/* Render Season List if a show is selected and no season is selected */}
      {selectedShow && !selectedSeason && (
        <SeasonList
          show={selectedShow}
          onSeasonSelect={handleSeasonSelect}
          onBack={handleBackToShows}
        />
      )}
      {/* Render Episode List if a season is selected */}
      {selectedSeason && (
        <EpisodeList season={selectedSeason} onBack={handleBackToSeasons} />
      )}
      {/* Render Show List if no show is selected */}
      {!selectedShow && !selectedSeason && (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}
    </div>
  );
}

export default App;
