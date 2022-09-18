import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylist from './playlistApi';

const initialState = {
  videos: [],
  isLoading: false,
  isError: false,
  error: '',
};

// Async thunk
export const fetchVideos = createAsyncThunk(
  'playlist/fetchVideos',
  async (playlistId) => {
    const videos = await getPlaylist(playlistId);
    return videos;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
        state.videos.push(action.payload)
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export default playlistSlice.reducer;
