import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/features/playlist/playlistSlice';
import styles from './PlaylistForm.module.scss';

const PlaylistForm = ({ open, handleClose }) => {
  const [playlistId, setPlaylistId] = useState('');
  const dispatch = useDispatch();
  const {isLoading, isError, error} = useSelector(state => state.playlist)

  if (playlistId.includes('youtube.com/watch?')) {
    const match = /[&|\?]list=([a-zA-Z0-9_-]+)/gi.exec(playlistId);
    setPlaylistId(match[1]);
  }

  console.log(error)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistId) {
      dispatch(fetchVideos(playlistId));
    }
  };

  return (
    <Dialog className={styles.dialog} open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialog__title}>Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new playlist please insert the playlist id or playlist link.
          Please make sure the link is valid. Otherwise we won&apos;t able to
          fetch the playlist information.
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
              fontStyle: 'italic',
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
  );
};

export default PlaylistForm;
