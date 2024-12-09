import "../css/index.css";

import Head from "next/head";

import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>clothes scraper</title>
        <meta name="Description" content="clothes scraper" />
        <meta property="og:image" content="/icons/clothes-scraper.png" />
        <link rel="icon" href="/icons/clothes-scraper.png" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
