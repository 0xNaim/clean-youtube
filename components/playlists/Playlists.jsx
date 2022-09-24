import { Box, Container, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
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
      {playlistsArray?.length === 0 && (
        <Typography variant='body1'>There are no playlist found</Typography>
      )}

      {playlistsArray?.length > 0 && (
        <Box
          component='div'
          className={styles.playlists__wrapper}
          sx={{ paddingY: 5 }}
        >
          <Container maxWidth='xl'>
            <Box component='div' className={styles.playlists}>
              <Typography
                className={styles.playlists__heading}
                variant='h4'
                sx={{ fontSize: { xs: 22, md: 28 } }}
              >
                Ongoing Playlists
              </Typography>

              <Typography
                className={styles.playlists__totalResult}
                variant='h6'
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {playlistsArray?.length} results
              </Typography>
            </Box>
            <Divider sx={{ marginTop: 1 }} />

            <Carousel draggable responsive={responsive}>
              {playlistsArray?.map((plist) => (
                <Box
                  className={styles.playlists__carousel}
                  key={plist.playlistId}
                  component='div'
                >
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
                    tag='Ongoing'
                  />
                </Box>
              ))}
            </Carousel>
          </Container>
        </Box>
      )}

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
