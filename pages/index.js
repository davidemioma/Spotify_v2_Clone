import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Player from "../components/Player";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-y-hidden ">
      <Head>
        <title>Spotify Clone - Dashboard</title>
      </Head>

      <main className=" flex min-w-max">
        <Sidebar />

        <Body />
      </main>

      <div className="h-24 w-full overflow-x-scroll scrollbar-hide flex items-center fixed bottom-0 left-0 bg-gradient-to-b from-black to-gray-900 text-white">
        <Player />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
