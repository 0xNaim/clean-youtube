import { combineReducers } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/favoriteSlice';
import playlistReducer from './playlist/playlistSlice';

const rootReducer = combineReducers({
  playlists: playlistReducer,
  favorites: favoriteReducer,
});

export default rootReducer;
