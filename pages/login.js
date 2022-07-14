import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

const Login = ({ providers }) => {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="bg-black w-screen h-screen pt-40 flex flex-col space-y-8 items-center">
      <Head>
        <title>Spotify Clone - Login</title>
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#1db954] text-white rounded-full px-6 py-3 transition duration-300 ease-out hover:scale-105 hover:bg-[#0db146] border border-transparent uppercase font-bold text-xs md:text-base tracking-wider"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
