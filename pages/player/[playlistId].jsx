import Layout from '../../components/layout';
import OtherPlaylists from '../../components/other-playlists/OtherPlaylists';
import VideoPlayer from '../../components/video-player/VideoPlayer';

const Player = () => {
  return (
    <Layout>
      <VideoPlayer />
      <OtherPlaylists />
    </Layout>
  );
};

export default Player;
