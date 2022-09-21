import { combineReducers } from '@reduxjs/toolkit';
import playlistReducer from './playlist/playlistSlice';
import videosReducer from './videos/videosSlice';

const rootReducer = combineReducers({
  playlists: playlistReducer,
  videos: videosReducer,
});

export default rootReducer;
