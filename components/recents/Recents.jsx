import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlaylistFromRecent } from '../../redux/recent/recentSlice';
import Notify from '../../utils/Notify';
import SingleCard from '../single-card/SingleCard';
import styles from './Recents.module.scss';

const Recents = () => {
  const { recents } = useSelector((state) => state.recents || {});
  const dispatch = useDispatch();
  const recentsArray = Object.values(recents);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDelete = (playlistId) => {
    const confirm = window.confirm('Are you sure to delete the playlist?');

    if (confirm) {
      setDeleteMessage('Playlist deleted successfully');
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(deletePlaylistFromRecent(playlistId));
      }, 1000);
    }
  };

  const snackbarCloseHandler = () => setOpenSnackbar(false);

  return (
    <>
      <Box
        component='div'
        className={styles.recents__wrapper}
        sx={{ marginY: 5 }}
      >
        <Container maxWidth='xl'>
          <Box component='div' className={styles.recents}>
            <Typography
              className={styles.recents__heading}
              variant='h4'
              sx={{ fontSize: { xs: 22, md: 28 } }}
            >
              Recent playlists
            </Typography>

            {recentsArray?.length > 0 && (
              <Typography
                className={styles.recents__totalResult}
                variant='h6'
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {recentsArray?.length} results
              </Typography>
            )}
          </Box>
          <Divider sx={{ marginTop: 1 }} />

          {recentsArray?.length === 0 && (
            <Typography variant='body1'>
              There are no recent activity
            </Typography>
          )}

          <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
            {recentsArray?.map((plist) => (
              <Grid item key={plist.playlistId} xs={12} sm={6} md={4} lg={3}>
                <SingleCard
                  channelId={plist.channelId}
                  channelName={plist.channelName}
                  playlistId={plist.playlistId}
                  playlistTitle={plist.playlistTitle}
                  playlistThumbnail={plist.playlistThumbnail}
                  playlistDescription={plist.playlistDescription}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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

export default Recents;
