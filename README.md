# Podcast Player Web Application

## Introduction

This project is a podcast player web application built using React. It enables users to explore podcasts by shows, seasons, and episodes while offering a feature to favorite episodes and shows. Users can sort their favorite shows and manage their list, with the ability to play podcast episodes directly from the interface. The app mimics modern media players by providing an intuitive navigation system, the ability to toggle favorites, and real-time audio controls for an enhanced user experience.

The core files involved in this project include:
- `App.jsx`
- `EpisodeList.jsx`
- `ShowList.jsx`
- `GenreNav.jsx`
- `SeasonList.jsx`
- `PodcastPlayer.jsx`

## Features

- **Audio Playback**: The `PodcastPlayer` component provides a user-friendly interface to play, pause, and close audio playback for selected podcast episodes.
- **Favorite Management**: Users can favorite both episodes and shows. This feature is implemented using toggle buttons and dynamically updates the UI to reflect favorited content.
- **Sorting**: Users can sort shows based on alphabetical order, newest, or oldest.
- **Dynamic State Management**: The app uses React’s state and hooks to handle user interactions like selecting a show, season, episode, and toggling favorites.

## Component Breakdown
- App.jsx
The App component is the main entry point of the application. It controls the flow between different views, such as displaying shows, seasons, and episodes, and manages user interactions like favoriting and selecting content.

## Key responsibilities:

Managing state for the selected show, season, and episode.
Handling favorite shows and episodes.
Sorting favorite shows and rendering the appropriate components (such as ShowList and SeasonList).
Handling interactions related to selecting shows, seasons, and episodes for playback.



## Example off App.jsx 

function App() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [showSortOption, setShowSortOption] = useState("a-z");

  const handleShowSelect = (show) => setSelectedShow(show);
  const handleSeasonSelect = (season) => setSelectedSeason(season);
  const handleEpisodeSelect = (episode) => setSelectedEpisode(episode);
  const handleFavoriteShowToggle = (show) => {
    // Logic for toggling show favorites
  };

  return (
    <div>
      <GenreNav />
      {selectedShow ? (
        <SeasonList show={selectedShow} />
      ) : (
        <ShowList onShowSelect={handleShowSelect} />
      )}
      {selectedSeason && (
        <EpisodeList season={selectedSeason} onEpisodeSelect={handleEpisodeSelect} />
      )}
      {selectedEpisode && (
        <PodcastPlayer episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />
      )}
    </div>
  );
}

export default App;





## PodcastPlayer.jsx
The PodcastPlayer component is responsible for handling the playback of a podcast episode. It provides play/pause controls and the ability to close the player, with a confirmation dialog if the audio is currently playing.

## Key features:

Audio Control: Handles playing and pausing of podcast episodes.
Close Confirmation: Prompts users with a confirmation dialog before closing the player when audio is still playing.


 ## Example

 import React, { useRef, useState } from "react";

function PodcastPlayer({ episode, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClosePlayer = () => {
    if (isPlaying) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const confirmClose = (confirmed) => {
    if (confirmed) {
      onClose();
    }
    setShowConfirmation(false);
  };

  return (
    <div className="podcast-player-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{episode.title}</p>
      </div>

      <audio
        controls
        autoPlay
        ref={audioRef}
        style={{ width: "300px" }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handleClosePlayer}>Close Player</button>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to close the player while audio is playing?</p>
          <button onClick={() => confirmClose(true)}>Yes</button>
          <button onClick={() => confirmClose(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default PodcastPlayer;
import React, { useRef, useState } from "react";

function PodcastPlayer({ episode, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClosePlayer = () => {
    if (isPlaying) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const confirmClose = (confirmed) => {
    if (confirmed) {
      onClose();
    }
    setShowConfirmation(false);
  };

  return (
    <div className="podcast-player-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{episode.title}</p>
      </div>

      <audio
        controls
        autoPlay
        ref={audioRef}
        style={{ width: "300px" }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handleClosePlayer}>Close Player</button>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to close the player while audio is playing?</p>
          <button onClick={() => confirmClose(true)}>Yes</button>
          <button onClick={() => confirmClose(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default PodcastPlayer;

import React, { useRef, useState } from "react";

function PodcastPlayer({ episode, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClosePlayer = () => {
    if (isPlaying) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const confirmClose = (confirmed) => {
    if (confirmed) {
      onClose();
    }
    setShowConfirmation(false);
  };

  return (
    <div className="podcast-player-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{episode.title}</p>
      </div>

      <audio
        controls
        autoPlay
        ref={audioRef}
        style={{ width: "300px" }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handleClosePlayer}>Close Player</button>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to close the player while audio is playing?</p>
          <button onClick={() => confirmClose(true)}>Yes</button>
          <button onClick={() => confirmClose(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default PodcastPlayer;

## ShowList.jsx
This component displays a list of available shows. Users can select a show to view its seasons, favorite/unfavorite shows, and sort the list based on various criteria.

## Key features:

Favorite Toggling: Users can favorite/unfavorite shows.
Sorting Options: Users can sort shows by title or date.


## Example

import React from "react";

function ShowList({ shows, onShowSelect, onFavoriteToggle, favorites }) {
  return (
    <div>
      {shows.map(show => (
        <div key={show.id}>
          <h3>{show.title}</h3>
          <button onClick={() => onShowSelect(show)}>Select Show</button>
          <button onClick={() => onFavoriteToggle(show)}>
            {favorites.includes(show) ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShowList;


## Usage Examples
 -Selecting a Show:

The user clicks on a show from the ShowList to view its seasons.
Playing an Episode:

Once the user selects a season and episode, the PodcastPlayer component starts playback with full audio controls.
Toggling Favorites:

Users can click the "Favorite" button next to a show or episode to add it to their favorites list. The button toggles between "Favorite" and "Unfavorite."

## Conclusion
This podcast player application serves as a robust, user-friendly interface for listening to and managing podcasts. With its clean architecture and organized components, it offers functionality such as audio playback, favorites management, and content filtering, making it a perfect fit for podcast enthusiasts. The React framework, combined with the use of hooks for state management, makes the app highly responsive and modular, allowing for easy scalability and future improvements.
