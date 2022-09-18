import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '../../redux/playlist/playlistSlice';
import styles from './PlaylistForm.module.scss';

const PlaylistForm = ({ open, handleClose }) => {
  const [playlistId, setPlaylistId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();
  const { playlist, error: responseError } = useSelector(
    (state) => state.playlists
  );

  if (playlistId.includes('youtube.com/watch?')) {
    const match = /[&|\?]list=([a-zA-Z0-9_-]+)/gi.exec(playlistId);
    setPlaylistId(match[1]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (playlist[playlistId]) {
      setErrorMessage('Playlist already exist!');
      setSuccessMessage('');
      setOpenSnackbar(true);
    }

    if (playlistId && !playlist[playlistId]) {
      setErrorMessage('');
      dispatch(fetchPlaylist(playlistId));
      setOpenSnackbar(true);
      setSuccessMessage('Playlist added');
      setPlaylistId('');
      handleClose();
    }
  };

  const snackbarCloseHandler = () => setOpenSnackbar(false);

  return (
    <>
      <Dialog className={styles.dialog} open={open} onClose={handleClose}>
        <DialogTitle className={styles.dialog__title}>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new playlist please insert the playlist id or playlist
            link. Please make sure the link is valid. Otherwise we won&apos;t
            able to fetch the playlist information.
          </DialogContentText>
          <TextField
            onChange={(e) => setPlaylistId(e.target.value)}
            margin='dense'
            label='Enter playlist ID or Link'
            fullWidth
            variant='standard'
            sx={{
              '& label.Mui-focused': { color: '#0ea5a0' },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#0ea5a0',
              },
              '.MuiInput-root:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#0ea5a0',
              },
              label: {
                fontFamily: 'Dank Mono Italic',
                fontWeight: 700,
                fontSize: 16
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={styles.dialog__btn}
            onClick={handleClose}
            variant='contained'
            disableRipple
            sx={{ marginRight: { xs:0, md: 2}}}
          >
            Cancel
          </Button>
          <Button
            className={styles.dialog__btn}
            onClick={handleSubmit}
            variant='contained'
            disableRipple
            disabled={!playlistId}
          >
            + Add Playlist
          </Button>
        </DialogActions>
      </Dialog>

      {errorMessage && errorMessage?.length > 0 && (
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
            {errorMessage}
          </Alert>
        </Snackbar>
      )}

      {successMessage && successMessage?.length > 0 && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={snackbarCloseHandler}
        >
          <Alert
            onClose={snackbarCloseHandler}
            severity='success'
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {responseError && responseError?.length > 0 && (
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
            {responseError}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default PlaylistForm;
