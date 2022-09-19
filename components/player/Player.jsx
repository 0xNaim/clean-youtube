import YouTube from 'react-youtube';

const Player = ({ videoId = '',  }) => {
  const opts = {
    width: '100%',
    height: '480',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return <YouTube videoId={videoId} opts={opts} loading={'Loading...'} />;
};

export default Player;
