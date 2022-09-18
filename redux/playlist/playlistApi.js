import axios from 'axios';

const getPlaylistItems = async (playlistId, pageToken = '', result = []) => {
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails,id,snippet,status&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];
  if (data?.nextPageToken) {
    result = getPlaylistItems(playlistId, data?.nextPageToken, result);
  }

  return result;
};

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  const { data } = await axios.get(URL);

  let playlistItems = await getPlaylistItems(playlistId);

  const {
    title: playlistTitle,
    description: playlistDescription,
    channelId,
    thumbnails,
    channelTitle,
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
      channelTitle,
      playlistItems,
    },
  };
};

export default getPlaylist;
