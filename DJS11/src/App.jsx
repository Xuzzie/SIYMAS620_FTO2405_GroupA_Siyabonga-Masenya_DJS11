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
  const [seasonIndex, setSeasonIndex] = useState(0); // Manage season index here

  // Fetch shows and genres when the app loads
  useEffect(() => {
    const fetchShowsAndGenres = async () => {
      try {
        const showResponse = await fetch("https://podcast-api.netlify.app");
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch shows: ${showResponse.statusText}`);
        }
        const showData = await showResponse.json();

        // Fetch seasons for each show and update the shows array
        const updatedShows = await Promise.all(
          showData.map(async (show) => {
            const showDetailsResponse = await fetch(
              `https://podcast-api.netlify.app/id/${show.id}`
            );
            const showDetails = await showDetailsResponse.json();
            return { ...show, seasons: showDetails.seasons || [] }; // Add seasons to each show
          })
        );

        setShows(updatedShows);

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
    setSelectedShow(show);
    setSeasonIndex(0); // Reset to first season when a new show is selected
  };

  // Handle season selection (initial season select)
  const handleSeasonSelect = (season) => setSelectedSeason(season);

  // Handle episode selection (activates the player without changing the page)
  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode({
      ...episode,
      file: "https://podcast-api.netlify.app/placeholder-audio.mp3", // Dummy audio file
    });
  };

  // Handle toggling episode favorites
  // Handle adding episode to favorites without toggling off other episodes
  // Handle toggling episode favorites
  const handleFavoriteToggle = (episode, showId) => {
    const isFavorite = favorites.some((fav) => fav.id === episode.id);

    // Toggle the episode's favorite state
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== episode.id) // Remove if already favorited
      : [...favorites, { ...episode, showId }]; // Add to favorites if not

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

  // Handle changing season with next/previous buttons
  const handleSeasonChange = (newIndex) => {
    setSeasonIndex(newIndex);
    setSelectedSeason(selectedShow.seasons[newIndex]);
  };

  // Filter shows based on the selected genre and search term
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      if (selectedGenre === "favorite-episodes") {
        return favorites.some((fav) => fav.showId === show.id);
      }
      if (selectedGenre) {
        const genre = genres.find((g) => g.id === selectedGenre);
        return genre?.shows?.includes(show.id.toString());
      }
      return true;
    });

  return (
    <div className="container">
      <h1>Orbital Radio</h1>
      <input
        type="text"
        placeholder="Search On Orbital Radio..."
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
          show={selectedShow} // Pass the full show with all seasons
          seasonIndex={seasonIndex} // Pass the current season index
          onSeasonChange={handleSeasonChange} // Pass the season change handler
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
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                <button onClick={() => handleEpisodeSelect(episode)}>
                  Play
                </button>
                <button
                  onClick={() => handleFavoriteToggle(episode, episode.showId)}
                >
                  Unfavorite
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedEpisode && (
        <PodcastPlayer
          episode={selectedEpisode}
          onClose={handleClosePlayer}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites} // Pass favorites to PodcastPlayer
        />
      )}
    </div>
  );
}

export default App;
