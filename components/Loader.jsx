import React from "react";
import Head from "next/head";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="bg-black w-screen h-screen pt-40 flex flex-col space-y-8 items-center">
      <Head>
        <title>Spotify Clone</title>
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
    </div>
  );
};

export default Loader;
