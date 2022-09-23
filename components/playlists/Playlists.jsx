import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritePlaylist } from '../../redux/favorite/favoriteSlice';
import { deletePlaylist } from '../../redux/playlist/playlistSlice';
import Notify from '../../utils/Notify';
import SingleCard from '../single-card/SingleCard';
import styles from './Playlists.module.scss';

const Playlists = () => {
  const { playlists } = useSelector((state) => state.playlists || {});
  const { favorites } = useSelector((state) => state.favorites || {});
  const dispatch = useDispatch();

  const playlistsArray = Object.values(playlists);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addMessage, setAddMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const addToFavoriteHandler = async (playlistId) => {
    if (playlistId && !favorites[playlistId]) {
      const response = await dispatch(fetchFavoritePlaylist(playlistId));

      if (response.meta.requestStatus === 'fulfilled') {
        setAddMessage('Playlist successfully added in favorite list');
        setOpenSnackbar(true);
      }
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure to delete the playlist?');

    if (confirm) {
      setDeleteMessage('Playlist deleted successfully');
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(deletePlaylist(id));
      }, 1000);
    }
  };

  const snackbarCloseHandler = () => setOpenSnackbar(false);

  return (
    <>
      <Box
        component='div'
        className={styles.playlist__wrapper}
        sx={{ paddingY: 5 }}
      >
        <Container maxWidth='xl'>
          <Box component='div' className={styles.playlist}>
            <Typography
              className={styles.playlist__heading}
              variant='h4'
              sx={{ fontSize: { xs: 22, md: 28 } }}
            >
              Ongoing Playlists
            </Typography>

            {playlistsArray?.length > 0 && (
              <Typography
                className={styles.playlist__totalResult}
                variant='h6'
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {playlistsArray?.length} results
              </Typography>
            )}
          </Box>
          <Divider sx={{ marginTop: 1 }} />

          {playlistsArray?.length === 0 && (
            <Typography variant='body1'>There are no playlist found</Typography>
          )}

          <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
            {playlistsArray?.map((plist) => (
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
                  addToFavoriteHandler={addToFavoriteHandler}
                  handleDelete={handleDelete}
                  showFavorite
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {addMessage && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={snackbarCloseHandler}
          message={addMessage}
          success
        />
      )}

      {deleteMessage && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={snackbarCloseHandler}
          message={deleteMessage}
        />
      )}
    </>
  );
};

export default Playlists;
