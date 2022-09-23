import axios from 'axios';
import getPlaylistItems from '../../utils/getPlaylistItems';

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  const { data } = await axios.get(URL);
  let playlistItems = await getPlaylistItems(playlistId);

  const {
    title: playlistTitle,
    description: playlistDescription,
    channelId,
    thumbnails,
    channelTitle: channelName,
  } = data?.items[0]?.snippet;

  playlistItems = playlistItems?.map((item) => {
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
    [playlistId]: {
      playlistId,
      playlistTitle,
      playlistDescription,
      playlistThumbnail: thumbnails.high,
      channelId,
      channelName,
      playlistItems,
    },
  };
};

export default getPlaylist;
