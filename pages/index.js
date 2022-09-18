import Head from 'next/head';
import Layout from '../components/layout';
import Playlists from '../components/playlists/Playlists';

const Home = () => {
  return (
    <>
      <Head>
        <title>Clean YouTube</title>
      </Head>
      <Layout>
        <Playlists />
      </Layout>
    </>
  );
};

export default Home;
