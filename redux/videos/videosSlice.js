import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylistVideos from './videosApi';

const initialState = {
  videos: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
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
  reducers: {
    setActiveVideoId: (state, action) => {
      state.activeVideoId = action.payload;
    },
    setActiveVideoIndex: (state, action) => {
      state.activeVideoIndex = action.payload;
    },
    setActiveVideoTitle: (state, action) => {
      state.activeVideoTitle = action.payload;
    },
  },
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
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export const { setActiveVideoId, setActiveVideoIndex, setActiveVideoTitle } =
  videosSlice.actions;
export default videosSlice.reducer;
