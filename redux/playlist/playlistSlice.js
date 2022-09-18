import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylist from './playlistApi';

const initialState = {
  playlist: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
};

// Async thunk
export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (playlistId) => {
    const playlist = await getPlaylist(playlistId);
    return playlist;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = '';
        state.isSuccess = true;
        state.playlist = { ...state.playlist, ...action.payload };
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action?.error?.message;
      });
  },
});

export default playlistSlice.reducer;
