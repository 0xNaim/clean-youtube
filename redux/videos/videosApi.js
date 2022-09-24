import axios from 'axios';
import getPlaylistItems from '../../utils/getPlaylistItems';

const getPlaylistVideos = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
  const { data } = await axios.get(URL);

  const {
    title: playlistTitle,
    description: playlistDescription,
    channelId,
    channelTitle: channelName,
  } = data?.items[0]?.snippet;

  let playlistVideos = await getPlaylistItems(playlistId);

  playlistVideos = playlistVideos?.map((item) => {
    const {
      title,
      description,
      thumbnails: { high },
    } = item.snippet;

    return {
      title,
      description,
      thumbnail: high,
      contentDetails: item.contentDetails,
    };
  });

  return {
    channelId,
    channelName,
    playlistTitle,
    playlistDescription,
    playlistVideos,
  };
};

export default getPlaylistVideos;
