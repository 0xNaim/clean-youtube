import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylistVideos from './videosApi';

const initialState = {
  videos: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
  activeVideoId: '',
  activeVideoTitle: '',
};

// Async thunk
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (playlistId) => {
    const videos = await getPlaylistVideos(playlistId);
    return videos;
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = '';
        state.videos = action.payload;
        state.activeVideoId = Object.values(
          action.payload
        )[0].contentDetails?.videoId;
        state.activeVideoTitle = Object.values(action.payload)[0]?.title;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.activeVideoId = '';
        state.activeVideoTitle = '';
      });
  },
});

export default videosSlice.reducer;
