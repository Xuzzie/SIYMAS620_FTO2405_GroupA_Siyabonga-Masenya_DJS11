import React, { useEffect, useState } from "react";
import ShowList from "./components/Showlist";
import SeasonList from "./components/SeasonList";
import EpisodeList from "./components/EpisodeList";
import GenreNav from "./components/GenreNav";
import PodcastPlayer from "./components/PodcastPlayer";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch shows and genres when the app loads
  useEffect(() => {
    const fetchShowsAndGenres = async () => {
      try {
        console.log("Fetching shows and genres...");
        // Fetch all show previews
        const showResponse = await fetch("https://podcast-api.netlify.app");
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch shows: ${showResponse.statusText}`);
        }
        const showData = await showResponse.json();
        console.log("Fetched shows:", showData);
        setShows(showData);

        // Fetch all genres
        const genrePromises = Array.from({ length: 9 }, (_, i) =>
          fetch(`https://podcast-api.netlify.app/genre/${i + 1}`).then(
            (res) => {
              if (!res.ok) {
                throw new Error(
                  `Failed to fetch genre with ID ${i + 1}: ${res.statusText}`
                );
              }
              return res.json();
            }
          )
        );
        const genreData = await Promise.all(genrePromises);
        console.log("Fetched genres:", genreData);
        setGenres(genreData);

        // Load favorites from localStorage
        const savedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
      } catch (error) {
        console.error("Error fetching shows or genres:", error);
      }
    };

    fetchShowsAndGenres();
  }, []);

  // Handle show selection
  const handleShowSelect = (show) => {
    console.log("Selected show:", show);
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch show details: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched show details:", data);
        setSelectedShow(data);
      })
      .catch((error) => console.error("Error fetching show details:", error));
  };

  // Handle season selection
  const handleSeasonSelect = (season) => {
    console.log("Selected season:", season);
    setSelectedSeason(season);
  };

  // Handle episode selection
  const handleEpisodeSelect = (episode) => {
    console.log("Selected episode:", episode);
    setSelectedEpisode(episode); // Set the selected episode to update the player
  };

  // Handle toggling episode favorites
  const handleFavoriteToggle = (episode) => {
    console.log("Toggling favorite:", episode);
    const updatedFavorites = favorites.some((fav) => fav.id === episode.id)
      ? favorites.filter((fav) => fav.id !== episode.id)
      : [...favorites, episode];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle going back to show list from season view
  const handleBackToShows = () => {
    console.log("Back to shows");
    setSelectedShow(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
  };

  // Handle going back to season list from episode view
  const handleBackToSeasons = () => {
    console.log("Back to seasons");
    setSelectedSeason(null);
    setSelectedEpisode(null);
  };

  // Handle genre selection from GenreNav component
  const handleGenreSelect = (genreId) => {
    console.log("Selected genre:", genreId);
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

      {/* Render Season List if a show is selected but no season is selected */}
      {selectedShow && !selectedSeason && (
        <SeasonList
          show={selectedShow}
          onSeasonSelect={handleSeasonSelect}
          onBack={handleBackToShows}
        />
      )}

      {/* Render Episode List if a season is selected but no episode is selected */}
      {selectedSeason && !selectedEpisode && (
        <EpisodeList
          season={selectedSeason}
          onEpisodeSelect={handleEpisodeSelect}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
          onBack={handleBackToSeasons}
        />
      )}

      {/* Render the Podcast Player if an episode is selected */}
      {selectedEpisode && <PodcastPlayer episode={selectedEpisode} />}

      {/* Render Show List if no show or season is selected */}
      {!selectedShow && !selectedSeason && (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}

      {/* Render Favorite Episodes if there are any */}
      {favorites.length > 0 && (
        <div>
          <h2>Favorite Episodes</h2>
          <ul>
            {favorites.map((episode) => (
              <li key={episode.id}>
                {episode.title}
                <button onClick={() => handleEpisodeSelect(episode)}>
                  Play
                </button>
                <button onClick={() => handleFavoriteToggle(episode)}>
                  Remove from Favorites
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
