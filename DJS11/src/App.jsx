import React, { useEffect, useState } from "react";
import ShowList from "./components/Showlist";
import SeasonList from "./components/SeasonList";
import EpisodeList from "./components/EpisodeList";
import GenreNav from "./components/GenreNav";
import PodcastPlayer from "./components/PodcastPlayer"; // Ensure this is the simplified PodcastPlayer
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
        const showResponse = await fetch("https://podcast-api.netlify.app");
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch shows: ${showResponse.statusText}`);
        }
        const showData = await showResponse.json();
        setShows(showData);

        const genrePromises = Array.from({ length: 9 }, (_, i) =>
          fetch(`https://podcast-api.netlify.app/genre/${i + 1}`).then((res) =>
            res.json()
          )
        );
        const genreData = await Promise.all(genrePromises);
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
    fetch(`https://podcast-api.netlify.app/id/${show.id}`)
      .then((response) => response.json())
      .then((data) => setSelectedShow(data))
      .catch((error) => console.error("Error fetching show details:", error));
  };

  // Handle season selection
  const handleSeasonSelect = (season) => setSelectedSeason(season);

  // Handle episode selection (activates the player without changing the page)
  const handleEpisodeSelect = (episode) => {
    // Set selected episode and add dummy audio
    setSelectedEpisode({
      ...episode,
      file: "https://podcast-api.netlify.app/placeholder-audio.mp3", // Dummy audio file
    });
  };

  // Handle toggling episode favorites
  const handleFavoriteToggle = (episode) => {
    const isFavorite = favorites.some((fav) => fav.id === episode.id);
    const updatedFavorites = isFavorite
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
  const handleBackToSeasons = () => setSelectedSeason(null);

  // Handle genre selection from GenreNav component
  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  // Close the podcast player
  const handleClosePlayer = () => setSelectedEpisode(null);

  // Filter shows based on the selected genre and search term
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      if (selectedGenre === "favorite-episodes") {
        return favorites.some((fav) => fav.id === show.id);
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
        ]}
        onGenreSelect={handleGenreSelect}
        selectedGenre={selectedGenre}
      />

      {selectedShow && !selectedSeason && (
        <SeasonList
          show={selectedShow}
          onSeasonSelect={handleSeasonSelect}
          onBack={handleBackToShows}
        />
      )}

      {selectedSeason && (
        <EpisodeList
          season={selectedSeason}
          onEpisodeSelect={handleEpisodeSelect}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
          onBack={handleBackToSeasons}
        />
      )}

      {!selectedShow &&
        !selectedSeason &&
        selectedGenre !== "favorite-episodes" && (
          <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
        )}

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

      {/* Display the PodcastPlayer when an episode is selected */}
      {selectedEpisode && (
        <PodcastPlayer episode={selectedEpisode} onClose={handleClosePlayer} />
      )}
    </div>
  );
}

export default App;
