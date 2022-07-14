import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrackId, setIsPlaying } from "../store/store";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();

  const dispatch = useDispatch();

  const { data: session } = useSession();

  const currentTrackId = useSelector((state) => state.track.currentTrackId);

  const isPlaying = useSelector((state) => state.track.isPlaying);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId && !songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((res) => dispatch(setCurrentTrackId(res?.body?.item?.id)));

      spotifyApi
        .getMyCurrentPlaybackState()
        .then((res) => dispatch(setIsPlaying(res?.body?.is_playing)));

      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  //If you want to Control Your spotify account from here
  // const handlePlayAndPause = () => {
  //   spotifyApi.getMyCurrentPlaybackState().then((res) => {
  //     if (res?.body?.is_playing) {
  //       spotifyApi.pause();

  //       dispatch(setIsPlaying(false));
  //     } else {
  //       spotifyApi.play();

  //       dispatch(setIsPlaying(true));
  //     }
  //   });
  // };

  // const debounceAndAdjustVolume = useCallback(
  //   debounce((volume) => {
  //     spotifyApi.setVolume(volume);
  //   }, 500),
  //   []
  // );

  // useEffect(() => {
  //   if (volume > 0 && volume < 100) {
  //     debounceAndAdjustVolume(volume);
  //   }
  // }, [volume]);

  return (
    <>
      {/* Premium Users only */}
      {songInfo && (
        <SpotifyPlayer
          styles={{
            activeColor: "#fff",
            bgColor: "#181818",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "70px",
            sliderTrackColor: "#535353",
            sliderTrackBorderRadius: "4px",
            sliderHandleColor: "#fff",
            errorColor: "#fff",
          }}
          token={session?.user?.accessToken}
          showSaveIcon
          callback={(state) => setIsPlaying(state.isPlaying)}
          play={isPlaying}
          uris={songInfo.uri ? [songInfo.uri] : []}
          magnifySliderOnHover={true}
          autoPlay={true}
        />
      )}

      {/* This is to control your spotify player you need spotify to use and you need a premium account */}
      {/* <div className="w-full flex space-x-12 justify-between text-xs md:text-sm lg:text-base px-2 md:px-8">
        <div className="flex items-center space-x-2">
          <img
            className="w-10 h-10"
            src={songInfo?.album?.images?.[0]?.url}
            alt=""
          />

          <div>
            <p className="w-28 truncate">{songInfo?.name}</p>

            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-5">
          <SwitchHorizontalIcon className="button" />

          <RewindIcon className="button" />

          {isPlaying ? (
            <PauseIcon
              className="w-10 h-10 button"
              onClick={handlePlayAndPause}
            />
          ) : (
            <PlayIcon
              className="w-10 h-10 button"
              onClick={handlePlayAndPause}
            />
          )}

          <FastForwardIcon className="button" />

          <ReplyIcon className="button" />
        </div>

        <div className="justify-self-end flex items-center space-x-3 md:space-x-4">
          <VolumeDownIcon
            className="button"
            onClick={() => volume > 0 && setVolume(volume - 10)}
          />

          <input
            className="w-14 md:w-28"
            value={volume}
            type="range"
            min={0}
            max={100}
            onChange={(e) => setVolume(Number(e.target.value))}
          />

          <VolumeUpIcon
            className="button"
            onClick={() => volume < 100 && setVolume(volume + 10)}
          />
        </div>
      </div> */}
    </>
  );
};

export default Player;
