import ReactPlayer from 'react-player/youtube';
import styles from './Player.module.scss';

const Player = ({ videoId }) => {
  const config = {
    youtube: {
      playerVars: { showinfo: 1 },
    },
  };

  return (
    <ReactPlayer
      className={styles.player}
      url={`https://www.youtube.com/watch?v=${videoId}`}
      config={config}
      playing
      controls
    />
  );
};

export default Player;
