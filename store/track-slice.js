import { createSlice } from "@reduxjs/toolkit";

const TrackSlice = createSlice({
  name: "track",
  initialState: {
    currentTrackId: null,
    isPlaying: false,
  },
  reducers: {
    setCurrentTrackId(state, action) {
      state.currentTrackId = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export default TrackSlice;
