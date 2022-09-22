import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritePlaylist } from '../../redux/favorite/favoriteSlice';
import styles from './SingleCard.module.scss';

const SingleCard = ({
  channelId,
  channelName,
  playlistId,
  playlistTitle,
  playlistDescription,
  playlistThumbnail,
  openSnackbar,
  snackbarCloseHandler,
  handleDelete,
}) => {
  const { favorites } = useSelector((state) => state.favorites);
  const { playlists } = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [openFavoriteSnackbar, setOpenFavoriteSnackbar] = useState(false);

  const favoriteSnackbarCloseHandler = () => setOpenFavoriteSnackbar(false);

  const addToFavoriteHandler = async (playlistId) => {
    if (playlistId && !favorites[playlistId]) {
      const response = await dispatch(fetchFavoritePlaylist(playlistId));

      if (response.meta.requestStatus === 'fulfilled') {
        setFavoriteMessage('Playlist successfully added in favorite list');
        setOpenFavoriteSnackbar(true);
      }
    }
  };

  return (
    <Card className={styles.playlist__card}>
      <Box component='div' className={styles.playlist__cardMedia}>
        <Image
          layout='responsive'
          className={styles.playlist__cardThumbnail}
          src={playlistThumbnail?.url}
          alt={playlistTitle}
          width={500}
          height={300}
        />

        <PlayCircleFilledIcon className={styles.playlist__card__playIcon} />

        <Box component='div' className={styles.card__iconsWrapper}>
          <Tooltip title='Favorite'>
            <IconButton
              onClick={() => addToFavoriteHandler(playlistId)}
              sx={{ marginRight: 1 }}
            >
              <FavoriteIcon sx={{ color: '#ffffffdf' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton onClick={() => handleDelete(playlistId)}>
              <DeleteForeverIcon sx={{ color: '#ffffffdf' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent className={styles.playlist__cardContent}>
        <Typography
          className={styles.cardContent__title}
          variant='h6'
          sx={{ fontSize: 18 }}
        >
          {playlistTitle?.substring(0, 50)}
        </Typography>

        <Box component='div'>
          <Box
            component='div'
            className={styles.cardContent__info}
            sx={{ marginY: 2 }}
          >
            <Link href={`https://www.youtube.com/channel/${channelId}`}>
              <a target='_black' className={styles.link}>
                <Box component='div' className={styles.cardContent__subInfo}>
                  <PersonIcon className={styles.subInfo__icon} />
                  <Typography className={styles.subInfo__title} variant='body1'>
                    {channelName}
                  </Typography>
                </Box>
              </a>
            </Link>

            <Typography className={styles.cardContent__ongoing} variant='body1'>
              Ongoing
            </Typography>
          </Box>

          <Typography variant='body2'>
            {playlistDescription?.substring(0, 80) ||
              ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.' +
                '...'}
          </Typography>
        </Box>

        <Link href={`player/${playlistId}`}>
          <a className={styles.link}>
            <Button
              className={styles.cardContent__btn}
              variant='contained'
              disableRipple
              fullWidth
            >
              Continue <ArrowRightAltIcon sx={{ marginLeft: 0.5 }} />
            </Button>
          </a>
        </Link>
      </CardContent>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={snackbarCloseHandler}
      >
        <Alert
          onClose={snackbarCloseHandler}
          severity='error'
          sx={{ width: '100%' }}
        >
          Playlist successfully deleted
        </Alert>
      </Snackbar>

      <Snackbar
        open={openFavoriteSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={favoriteSnackbarCloseHandler}
      >
        <Alert
          onClose={favoriteSnackbarCloseHandler}
          severity='success'
          sx={{ width: '100%' }}
        >
          {favoriteMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default SingleCard;
