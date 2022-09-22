import Head from 'next/head';
import Favorites from '../components/favorites/Favorites';
import Layout from '../components/layout';
import Playlists from '../components/playlists/Playlists';

const Home = () => {
  return (
    <>
      <Head>
        <title>Clean YouTube</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Layout>
        <Playlists />
        <Favorites />
      </Layout>
    </>
  );
};

export default Home;
