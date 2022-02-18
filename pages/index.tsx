import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Planning poker app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Planning Poker</h1>
      </main>

      <footer className="flex items-center content-center flex-1 px-0 py-2 border-t border-emerald-600 ">
        <a
          href="#"
          target="_self"
          rel="noopener noreferrer"
          className="flex items-center justify-center flex-grow text-emerald-500"
        >
          Powered by JhesG
        </a>
      </footer>
    </div>
  );
};

export default Home;
