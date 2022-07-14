import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../store/store";
import { useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import Dropdown from "./Dropdown";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Body = () => {
  const dispatch = useDispatch();

  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const [color, setColor] = useState(null);

  const playlistId = useSelector((state) => state.playlist.playlistId);

  const playlist = useSelector((state) => state.playlist.playlist);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((res) => dispatch(setPlaylist(res.body)))
        .catch((err) => console.log("Something went wrong"));
    }
  }, [spotifyApi, session, playlistId]);

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide ">
      <header className="absolute top-5 right-6 text-white">
        <Dropdown />
      </header>

      <section
        className={`flex items-end space-x-7 p-8 h-80 bg-gradient-to-b ${color} to-black text-white`}
      >
        <img
          className="w-44 h-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />

        <div>
          <p>PLAYLIST</p>

          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <Songs />
    </div>
  );
};

export default Body;
