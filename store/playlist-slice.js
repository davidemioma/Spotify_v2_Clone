import { createSlice } from "@reduxjs/toolkit";

const PlaylistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlistId: "6rnerBE09KnDQyki9nBf1B",
    playlist: null,
  },
  reducers: {
    setPlaylistId(state, action) {
      state.playlistId = action.payload;
    },

    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
  },
});

export default PlaylistSlice;
