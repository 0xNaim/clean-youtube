import axios from 'axios';

const getPlaylistVideos = async (playlistId, pageToken = '', result = []) => {
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails,id,snippet,status&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];
  if (data?.nextPageToken) {
    result = getPlaylistVideos(playlistId, data?.nextPageToken, result);
  }

  const videos = result?.map((item) => {
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

  return videos;
};

export default getPlaylistVideos;
