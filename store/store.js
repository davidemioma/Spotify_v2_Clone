import { configureStore } from "@reduxjs/toolkit";
import PlaylistSlice from "./playlist-slice";
import TrackSlice from "./track-slice";

const store = configureStore({
  reducer: {
    playlist: PlaylistSlice.reducer,
    track: TrackSlice.reducer,
  },
});

export const { setPlaylistId, setPlaylist } = PlaylistSlice.actions;

export const { setCurrentTrackId, setIsPlaying } = TrackSlice.actions;

export default store;
