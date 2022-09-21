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

const getPlaylistVideos = async (playlistId) => {
  let playlistItems = await getPlaylistItems(playlistId);

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

  return playlistItems;
};

export default getPlaylistVideos;
