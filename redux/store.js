import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './features/api/apiSlice';
import playlistSlice from './features/playlist/playlistSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    playlist: playlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
