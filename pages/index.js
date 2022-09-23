import Head from 'next/head';
import Favorites from '../components/favorites/Favorites';
import Layout from '../components/layout';
import Playlists from '../components/playlists/Playlists';
import Recents from '../components/recents/Recents';

const Home = () => {
  return (
    <>
      <Head>
        <title>Clean YouTube</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Layout>
        <Playlists />
        <Favorites />
        <Recents />
      </Layout>
    </>
  );
};

export default Home;
