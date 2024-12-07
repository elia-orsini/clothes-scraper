import "../css/index.css";

import Head from "next/head";

import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>listings scraper</title>
        <meta name="Description" content="listings scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
