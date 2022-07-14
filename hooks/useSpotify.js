import SpotifyWebApi from "spotify-web-api-node";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session } = useSession();

  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (session) {
      if (session?.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(accessToken);
    }
  }, [session, accessToken]);

  return spotifyApi;
};

export default useSpotify;
