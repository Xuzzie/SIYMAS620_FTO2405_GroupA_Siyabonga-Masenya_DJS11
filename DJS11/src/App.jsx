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
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [seasonIndex, setSeasonIndex] = useState(0);

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
            return { ...show, seasons: showDetails.seasons || [] };
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

        // Load saved favorites from localStorage
        const savedFavoriteEpisodes =
          JSON.parse(localStorage.getItem("favoriteEpisodes")) || [];
        const savedFavoriteShows =
          JSON.parse(localStorage.getItem("favoriteShows")) || [];

        setFavoriteEpisodes(savedFavoriteEpisodes);
        setFavoriteShows(savedFavoriteShows);
      } catch (error) {
        console.error("Error fetching shows or genres:", error);
      }
    };

    fetchShowsAndGenres();
  }, []);

  // Handle show selection
  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSeasonIndex(0);
  };

  // Handle season selection
  const handleSeasonSelect = (season) => setSelectedSeason(season);

  // Handle episode selection
  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode({
      ...episode,
      file: "https://podcast-api.netlify.app/placeholder-audio.mp3",
    });
  };

  // Handle favoriting/unfavoriting episodes without affecting other episodes
  const handleFavoriteEpisodeToggle = (episode, showId, season) => {
    // Unique key for the episode based on showId and episodeId
    const uniqueKey = `${showId}-${episode.id}`;

    const isFavorite = favoriteEpisodes.some(
      (fav) => fav.uniqueKey === uniqueKey
    );

    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites if already exists
      updatedFavorites = favoriteEpisodes.filter(
        (fav) => fav.uniqueKey !== uniqueKey
      );
    } else {
      // Add to favorites if doesn't exist
      const newFavoriteEpisode = {
        ...episode,
        showId,
        season: season,
        uniqueKey,
        favoritedAt: new Date().toISOString(),
      };
      updatedFavorites = [...favoriteEpisodes, newFavoriteEpisode];
    }

    // Update state and localStorage
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updatedFavorites));
  };

  // Handle toggling show favorites
  const handleFavoriteShowToggle = (show) => {
    const isFavorite = favoriteShows.some((fav) => fav.id === show.id);

    const updatedFavorites = isFavorite
      ? favoriteShows.filter((fav) => fav.id !== show.id)
      : [...favoriteShows, { ...show, favoritedAt: new Date().toISOString() }];

    setFavoriteShows(updatedFavorites);
    localStorage.setItem("favoriteShows", JSON.stringify(updatedFavorites));
  };

  const handleBackToShows = () => {
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  const handleBackToSeasons = () => setSelectedSeason(null);

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setSelectedShow(null);
    setSelectedSeason(null);
  };

  const handleClosePlayer = () => setSelectedEpisode(null);

  const handleSeasonChange = (newIndex) => {
    setSeasonIndex(newIndex);
    setSelectedSeason(selectedShow.seasons[newIndex]);
  };

  const isEpisodeFavorited = (episode, showId) => {
    const uniqueKey = `${showId}-${episode.id}`;
    return favoriteEpisodes.some((fav) => fav.uniqueKey === uniqueKey);
  };

  // Filter shows based on search and genre
  const filteredShows = shows
    .filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((show) => {
      if (selectedGenre === "favorite-episodes") {
        return (
          favoriteEpisodes.some((fav) => fav.showId === show.id) ||
          favoriteShows.some((fav) => fav.id === show.id)
        );
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
          onFavoriteToggle={handleFavoriteShowToggle} // Send toggle handler
          favorites={favoriteShows}
        />
      )}

      {selectedSeason && (
        <EpisodeList
          show={selectedShow}
          seasonIndex={seasonIndex}
          onSeasonChange={handleSeasonChange}
          onEpisodeSelect={handleEpisodeSelect}
          onFavoriteToggle={(episode) =>
            handleFavoriteEpisodeToggle(
              episode,
              selectedShow.id,
              selectedSeason
            )
          }
          favorites={favoriteEpisodes}
          onBack={handleBackToSeasons}
          isEpisodeFavorited={(episode) =>
            isEpisodeFavorited(episode, selectedShow.id)
          }
        />
      )}

      {!selectedShow &&
        !selectedSeason &&
        selectedGenre !== "favorite-episodes" && (
          <ShowList shows={filteredShows} onShowSelect={handleShowSelect} />
        )}

      {selectedGenre === "favorite-episodes" &&
        (favoriteEpisodes.length > 0 || favoriteShows.length > 0) && (
          <div>
            <h2>Favorite Episodes</h2>
            <ul>
              {favoriteEpisodes.map((episode) => (
                <li
                  key={episode.uniqueKey || `${episode.showId}-${episode.id}`}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{episode.title}</h3>
                    <span className="timestamp">
                      <strong>Favorited on:</strong>{" "}
                      {new Date(episode.favoritedAt).toLocaleString()}
                    </span>
                  </div>
                  <p>{episode.description}</p>
                  <button onClick={() => handleEpisodeSelect(episode)}>
                    Play
                  </button>
                  <button
                    onClick={() =>
                      handleFavoriteEpisodeToggle(
                        episode,
                        episode.showId,
                        episode.season
                      )
                    }
                  >
                    Unfavorite
                  </button>
                </li>
              ))}
              <h2>Favorite Shows</h2>
              {favoriteShows.map((show) => (
                <li key={show.id}>
                  <div>
                    <img
                      src={show.image}
                      alt={show.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <h3>{show.title}</h3>
                    <p>{show.description}</p>
                    <button onClick={() => handleShowSelect(show)}>
                      View
                    </button>{" "}
                    {/* Updated to use handleShowSelect */}
                    <button onClick={() => handleFavoriteShowToggle(show)}>
                      Unfavorite
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      {selectedEpisode && (
        <PodcastPlayer
          episode={selectedEpisode}
          onClose={handleClosePlayer}
          onFavoriteToggle={(episode) =>
            handleFavoriteEpisodeToggle(
              episode,
              selectedShow?.id || episode.showId,
              selectedSeason
            )
          }
          favorites={favoriteEpisodes}
          showId={selectedShow?.id || selectedEpisode.showId}
        />
      )}
    </div>
  );
}

export default App;
