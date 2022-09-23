import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylist from '../playlist/playlistApi';

const initialState = {
  recents: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
};

// Async thunk
export const fetchRecentPlaylist = createAsyncThunk(
  'recent/fetchRecentPlaylist',
  async (playlistId) => {
    const playlist = await getPlaylist(playlistId);
    return playlist;
  }
);

const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    deletePlaylistFromRecent: (state, action) => {
      delete state.recents[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecentPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = '';
        state.recents = { ...action.payload, ...state.recents };
      })
      .addCase(fetchRecentPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export const { deletePlaylistFromRecent } = recentSlice.actions;
export default recentSlice.reducer;
