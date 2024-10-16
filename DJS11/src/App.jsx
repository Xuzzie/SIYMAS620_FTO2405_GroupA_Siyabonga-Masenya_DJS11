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
        // Fetch all show previews
        const showResponse = await fetch("https://podcast-api.netlify.app");
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch shows: ${showResponse.statusText}`);
        }
        const showData = await showResponse.json();
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
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch show details: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => setSelectedShow(data))
      .catch((error) => console.error("Error fetching show details:", error));
  };

  // Handle season selection
  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  // Handle episode selection (this will activate the player without changing the page)
  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode); // Set the selected episode to update the player
  };

  // Handle toggling episode favorites
  const handleFavoriteToggle = (episode) => {
    const updatedFavorites = favorites.some((fav) => fav.id === episode.id)
      ? favorites.filter((fav) => fav.id !== episode.id)
      : [...favorites, episode];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Handle going back to show list from season view
  const handleBackToShows = () => {
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  // Handle going back to season list from episode view
  const handleBackToSeasons = () => {
    setSelectedSeason(null);
  };

  // Handle genre selection from GenreNav component
  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Close the podcast player
  const handleClosePlayer = () => {
    setSelectedEpisode(null);
  };

  // Filter shows based on the selected genre and search term
  const filteredShows =
    selectedGenre === "favorites"
      ? []
      : shows
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

      {/* Search Bar and Genre Navigation */}
      <input
        type="text"
        placeholder="Search for a show..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <GenreNav
        genres={[...genres, { id: "favorites", title: "Favorites" }]}
        onGenreSelect={handleGenreSelect}
        selectedGenre={selectedGenre}
      />

      {/* Render Shows List */}
      {!selectedShow && !selectedSeason && selectedGenre !== "favorites" && (
        <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
      )}

      {/* Render Season List if a show is selected */}
      {selectedShow && !selectedSeason && (
        <SeasonList
          show={selectedShow}
          onSeasonSelect={handleSeasonSelect}
          onBack={handleBackToShows}
        />
      )}

      {/* Render Episode List if a season is selected */}
      {selectedSeason && (
        <EpisodeList
          season={selectedSeason}
          onEpisodeSelect={handleEpisodeSelect}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
          onBack={handleBackToSeasons}
        />
      )}

      {/* Render Favorite Episodes if "Favorites" Genre is Selected */}
      {selectedGenre === "favorites" && (
        <div>
          <h2>Favorite Episodes</h2>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((episode) => (
                <li key={episode.id}>
                  <h3>{episode.title}</h3>
                  <button onClick={() => handleEpisodeSelect(episode)}>
                    Play
                  </button>
                  <button onClick={() => handleFavoriteToggle(episode)}>
                    Remove from Favorites
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorite episodes yet.</p>
          )}
        </div>
      )}

      {/* Persistent Podcast Player at the bottom of the page */}
      {selectedEpisode && (
        <PodcastPlayer episode={selectedEpisode} onClose={handleClosePlayer} />
      )}
    </div>
  );
}

export default App;
