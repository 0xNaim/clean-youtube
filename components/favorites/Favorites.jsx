import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlaylistFromFavorite } from '../../redux/favorite/favoriteSlice';
import SingleCard from '../single-card/SingleCard';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const favoritesArray = Object.values(favorites);

  const handleDelete = (playlistId) => {
    const confirm = window.confirm('Are you sure to delete the playlist?');

    if (confirm) {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(deletePlaylistFromFavorite(playlistId));
      }, 1000);
    }
  };dfdsfd

  const snackbarCloseHandler = () => setOpenSnackbar(false);

  return (
    <>
      {favoritesArray?.length > 0 && (
        <Box component='div' className={styles.favorites__wrapper}>
          <Container maxWidth='xl'>
            <Box component='div' className={styles.favorites}>
              <Typography
                className={styles.favorites__heading}
                variant='h4'
                sx={{ fontSize: { xs: 22, md: 28 } }}
              >
                Favorite Playlists
              </Typography>

              {favoritesArray?.length > 0 && (
                <Typography
                  className={styles.favorites__totalResult}
                  variant='h6'
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  {favoritesArray?.length} results
                </Typography>
              )}
            </Box>
            <Divider sx={{ marginTop: 1 }} />

            <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
              {favoritesArray?.map((plist) => (
                <Grid item key={plist.playlistId} xs={12} sm={6} md={4} lg={3}>
                  <SingleCard
                    channelId={plist.channelId}
                    channelName={plist.channelName}
                    playlistId={plist.playlistId}
                    playlistTitle={plist.playlistTitle}
                    playlistThumbnail={plist.playlistThumbnail}
                    playlistDescription={plist.playlistDescription}
                    openSnackbar={openSnackbar}
                    snackbarCloseHandler={snackbarCloseHandler}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Favorites;
