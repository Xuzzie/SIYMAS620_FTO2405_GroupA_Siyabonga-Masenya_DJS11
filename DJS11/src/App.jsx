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
        const showResponse = await fetch("https://podcast-api.netlify.app");
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch shows: ${showResponse.statusText}`);
        }
        const showData = await showResponse.json();
        console.log("Fetched shows:", showData);
        setShows(showData);

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

  // Handle episode selection (activates the player without changing the page)
  const handleEpisodeSelect = (episode) => {
    console.log("Selected episode:", episode);
    setSelectedEpisode(episode); // Set the selected episode to update the player
  };

  // Handle toggling episode favorites
  const handleFavoriteToggle = (episode) => {
    console.log("Toggling favorite:", episode);
    // Check if the episode is already in favorites
    const isFavorite = favorites.some((fav) => fav.id === episode.id);

    if (isFavorite) {
      // If it's already a favorite, remove it
      const updatedFavorites = favorites.filter((fav) => fav.id !== episode.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // If it's not a favorite, add it
      const updatedFavorites = [...favorites, episode]; // Add the selected episode
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Handle going back to show list from season view
  const handleBackToShows = () => {
    console.log("Back to shows");
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  // Handle going back to season list from episode view
  const handleBackToSeasons = () => {
    console.log("Back to seasons");
    setSelectedSeason(null);
  };

  // Handle genre selection from GenreNav component
  const handleGenreSelect = (genreId) => {
    console.log("Selected genre:", genreId);
    setSelectedGenre(genreId);

    // Reset selected show and season to go back to show list
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  // Close the podcast player
  const handleClosePlayer = () => {
    console.log("Closing podcast player");
    setSelectedEpisode(null);
  };

  // Filter shows based on the selected genre and search term
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      if (selectedGenre === "favorite-episodes") {
        return favorites.some((fav) => fav.id === show.id); // Match episodes based on ID
      }
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
        genres={[
          ...genres,
          { id: "favorite-episodes", name: "Favorite Episodes" },
        ]} // Add Favorite Episodes genre
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

      {/* Render Episode List if a season is selected */}
      {selectedSeason && (
        <EpisodeList
          season={selectedSeason}
          onEpisodeSelect={handleEpisodeSelect}
          onFavoriteToggle={handleFavoriteToggle} // Ensure this is passed correctly
          favorites={favorites}
          onBack={handleBackToSeasons}
        />
      )}

      {/* Render Show List if no show or season is selected */}
      {!selectedShow &&
        !selectedSeason &&
        selectedGenre !== "favorite-episodes" && (
          <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
        )}

      {/* Render Favorite Episodes if "Favorite Episodes" genre is selected */}
      {selectedGenre === "favorite-episodes" && favorites.length > 0 && (
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

      {/* Persistent Podcast Player at the bottom of the page */}
      {selectedEpisode && (
        <PodcastPlayer episode={selectedEpisode} onClose={handleClosePlayer} />
      )}
    </div>
  );
}

export default App;
