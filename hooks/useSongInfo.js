import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";

const useSongInfo = () => {
  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const currentTrackId = useSelector((state) => state.track.currentTrackId);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi, session]);

  return songInfo;
};

export default useSongInfo;
