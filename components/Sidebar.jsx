import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { setPlaylistId } from "../store/store";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const dispatch = useDispatch();

  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => setPlaylists(res.body.items));
    }
  }, [spotifyApi, session]);

  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 sm:max-w-[12rem] lg:max-w-[15rem] pb-36">
      <div className="space-y-4">
        <Image
          src="https://rb.gy/y9mwtb"
          width={150}
          height={50}
          objectFit="cover"
        />

        <SidebarItem Icon={HomeIcon} text="Home" />

        <SidebarItem Icon={SearchIcon} text="Search" />

        <SidebarItem Icon={LibraryIcon} text="Your Library" />

        <hr className="border-t-[0.1px] border-gray-800" />

        <SidebarItem Icon={PlusCircleIcon} text="Create Playlists" />

        <SidebarItem Icon={HeartIcon} text="Liked Songs" />

        <SidebarItem Icon={RssIcon} text="Your Episodes" />

        <hr className="border-t-[0.1px] border-gray-800" />

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => dispatch(setPlaylistId(playlist.id))}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
