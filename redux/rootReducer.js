import { combineReducers } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/favoriteSlice';
import playlistReducer from './playlist/playlistSlice';
import recentReducer from './recent/recentSlice';
import videosReducer from './videos/videosSlice';

const rootReducer = combineReducers({
  playlists: playlistReducer,
  videos: videosReducer,
  favorites: favoriteReducer,
  recents: recentReducer,
});

export default rootReducer;
