import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylist from './playlistApi';

const initialState = {
  playlists: {},
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
  reducers: {
    deletePlaylist: (state, action) => {
      delete state.playlists[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = '';
        state.playlists = { ...state.playlists, ...action.payload };
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export const { deletePlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
