import Head from 'next/head';
import Layout from '../../components/layout';
import VideoPlayer from '../../components/video-player/VideoPlayer';

const Player = () => {
  return (
    <>
      <Head>
        <title>Player || Clean YouTube</title>
      </Head>
      <Layout>
        <VideoPlayer />
      </Layout>
    </>
  );
};

export default Player;
