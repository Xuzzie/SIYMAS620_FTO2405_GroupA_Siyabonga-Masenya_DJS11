import React, { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
import PodcastList from "./components/PodcastList.jsx";
import SeasonList from "./components/SeasonList.jsx";
import "./App.css";
function App() {
  const [podcasts, setPodcasts] = useState([]); // To hold the podcast data
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(
          "https://podcast-api.netlify.app/podcasts"
        );
        const data = await response.json();
        setPodcasts(data); // Set the fetched data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchPodcasts(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      <h1>Podcast App</h1>
      <p>Welcome to the Podcast App!</p>
      <ShowList />
    </div>
  );
}

export default App;
