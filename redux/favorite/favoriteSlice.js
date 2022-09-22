import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getPlaylist from '../playlist/playlistApi';

const initialState = {
  favorites: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
};

// Async thunk
export const fetchFavoritePlaylist = createAsyncThunk(
  'favorite/fetchFavoritePlaylist',
  async (playlistId) => {
    const playlist = await getPlaylist(playlistId);
    return playlist;
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    deletePlaylistFromFavorite: (state, action) => {
      delete state.favorites[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritePlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritePlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = '';
        state.favorites = { ...state.favorites, ...action.payload };
      })
      .addCase(fetchFavoritePlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export const { deletePlaylistFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
