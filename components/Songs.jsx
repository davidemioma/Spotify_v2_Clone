import React from "react";
import { useSelector } from "react-redux";
import Track from "./Track";

const Songs = () => {
  const playlist = useSelector((state) => state.playlist.playlist);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-24">
      {playlist?.tracks?.items?.map((track, i) => (
        <Track key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
