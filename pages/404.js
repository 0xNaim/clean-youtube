import Head from 'next/head';
import Layout from '../components/layout';
import PageNotFound from '../components/not-found/NotFound';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Layout>
        <PageNotFound />
      </Layout>
    </>
  );
};

export default NotFound;
