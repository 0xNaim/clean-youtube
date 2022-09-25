import { Box, Container, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlaylistFromFavorite } from '../../redux/favorite/favoriteSlice';
import Notify from '../../utils/Notify';
import SingleCard from '../single-card/SingleCard';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const favoritesArray = Object.values(favorites);

  const handleDelete = (playlistId) => {
    const confirm = window.confirm('Are you sure to delete the playlist?');

    if (confirm) {
      setDeleteMessage('Playlist deleted successfully');
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(deletePlaylistFromFavorite(playlistId));
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
      {favoritesArray?.length > 0 && (
        <Box
          component='div'
          className={styles.favorites__wrapper}
          sx={{ marginBottom: 5 }}
        >
          <Container maxWidth='xl'>
            <Box component='div' className={styles.favorites}>
              <Typography
                className={styles.favorites__heading}
                variant='h4'
                sx={{ fontSize: { xs: 22, md: 28 } }}
              >
                Favorite Playlists
              </Typography>

              <Typography
                className={styles.favorites__totalResult}
                variant='h6'
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {favoritesArray?.length} results
              </Typography>
            </Box>
            <Divider sx={{ marginTop: 1, marginBottom: 3 }} />

            <Carousel draggable responsive={responsive}>
              {favoritesArray?.map((plist) => (
                <Box
                  className={styles.favorites__carousel}
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
                    handleDelete={handleDelete}
                    tag='Favorite'
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

export default Favorites;
