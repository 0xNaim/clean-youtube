import axios from 'axios';

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  const { data } = await axios.get(URL);

  const {
    title: playlistTitle,
    description: playlistDescription,
    channelId,
    thumbnails,
    channelTitle: channelName,
  } = data?.items[0]?.snippet;

  return {
    [playlistId]: {
      playlistId,
      playlistTitle,
      playlistDescription,
      playlistThumbnail: thumbnails.high,
      channelId,
      channelName,
    },
  };
};

export default getPlaylist;
