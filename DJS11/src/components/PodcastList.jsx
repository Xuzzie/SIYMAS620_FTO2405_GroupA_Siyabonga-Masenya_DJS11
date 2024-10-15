const PodcastList = ({ podcasts }) => {
  return (
    <ul>
      {podcasts.map((podcast) => (
        <li key={podcast.id}>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default PodcastList;
