import { Box, Container, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {recentsArray?.length > 0 && (
        <Box
          component='div'
          className={styles.recents__wrapper}
          sx={{ marginBottom: 5 }}
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

              <Typography
                className={styles.recents__totalResult}
                variant='h6'
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {recentsArray?.slice(0, 5).length} results
              </Typography>
            </Box>
            <Divider sx={{ marginTop: 1, marginBottom: 3 }} />

            <Carousel draggable responsive={responsive}>
              {recentsArray?.slice(0, 5).map((plist) => (
                <Box
                  key={plist.playlistId}
                  component='div'
                  className={styles.recents__carousel}
                  sx={{ marginY: 0.2, marginX: 0.2 }}
                >
                  <SingleCard
                    channelId={plist.channelId}
                    channelName={plist.channelName}
                    playlistId={plist.playlistId}
                    playlistTitle={plist.playlistTitle}
                    playlistThumbnail={plist.playlistThumbnail}
                    playlistDescription={plist.playlistDescription}
                    handleDelete={handleDelete}
                    tag='Watched'
                  />
                </Box>
              ))}
            </Carousel>
          </Container>
        </Box>
      )}

      {deleteMessage && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={snackbarCloseHandler}
          message={deleteMessage}
          severity='error'
        />
      )}
    </>
  );
};

export default Recents;
