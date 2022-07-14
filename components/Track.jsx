import React from "react";
import useSpotify from "../hooks/useSpotify";
import { useDispatch } from "react-redux";
import { millsToMinsAndSecs } from "../lib/time";
import { setCurrentTrackId, setIsPlaying } from "../store/store";

const Track = ({ order, track }) => {
  const spotifyApi = useSpotify();

  const dispatch = useDispatch();

  const playSong = () => {
    dispatch(setCurrentTrackId(track.track.id));

    dispatch(setIsPlaying(true));

    //If you want to Control Your spotify account from here
    // spotifyApi.play({
    //   uris: [track.track.uri],
    // });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 cursor-pointer rounded-lg hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>

        <img
          className="w-10 h-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>

          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <p className="w-40">{track.track.album.name}</p>

        <p>{millsToMinsAndSecs(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Track;
