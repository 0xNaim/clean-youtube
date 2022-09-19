import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import SingleCard from '../single-card/SingleCard';
import styles from './Playlists.module.scss';

const Playlists = () => {
  const { playlist } = useSelector((state) => state.playlists) || {};
  const playlistArray = Object.values(playlist);

  return (
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

          {playlistArray?.length > 0 && (
            <Typography
              className={styles.playlist__totalResult}
              variant='h6'
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              {playlistArray?.length} results
            </Typography>
          )}
        </Box>
        <Divider sx={{ marginTop: 1 }} />

        {playlistArray?.length === 0 && (
          <Typography variant='body1'>There are no playlist found</Typography>
        )}

        <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
          {playlistArray &&
            playlistArray?.length > 0 &&
            playlistArray?.map((plist) => (
              <Grid item key={plist.playlistId} xs={12} sm={6} md={4} lg={3}>
                <SingleCard
                  channelId={plist.channelId}
                  channelName={plist.channelName}
                  playlistId={plist.playlistId}
                  playlistTitle={plist.playlistTitle}
                  playlistThumbnail={plist.playlistThumbnail}
                  playlistDescription={plist.playlistDescription}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Playlists;
