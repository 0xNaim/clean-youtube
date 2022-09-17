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
import styles from './PlaylistForm.module.scss';

const PlaylistForm = ({ open, handleClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(text);
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
          onChange={(e) => setText(e.target.value)}
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
          disabled={!text}
        >
          + Add Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistForm;
