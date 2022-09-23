import { combineReducers } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/favoriteSlice';
import playlistReducer from './playlist/playlistSlice';
import recentReducer from './recent/recentSlice';

const rootReducer = combineReducers({
  playlists: playlistReducer,
  favorites: favoriteReducer,
  recents: recentReducer,
});

export default rootReducer;
