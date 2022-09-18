import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './Playlists.module.scss';

const Playlists = () => {
  const { playlist, isLoading, isError, error } =
    useSelector((state) => state.playlists) || {};
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
          <Typography
            className={styles.playlist__totalResult}
            variant='h6'
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {playlistArray?.length} results
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1 }} />

        <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
          {playlistArray &&
            playlistArray?.length > 0 &&
            playlistArray?.map((plist) => (
              <Grid item key={plist.playlistId} xs={12} sm={6} md={4} lg={3}>
                <Card className={styles.playlist__card}>
                  <CardMedia
                    component='img'
                    height='160'
                    image={plist.playlistThumbnail.url}
                    alt={plist.playlistTitle}
                  />

                  <CardContent className={styles.playlist__cardContent}>
                    <Typography
                      className={styles.cardContent__title}
                      variant='h6'
                      sx={{ fontSize: 18 }}
                    >
                      {plist.playlistTitle.substring(0, 50)}
                    </Typography>

                    <Box component='div'>
                      <Box
                        component='div'
                        className={styles.cardContent__info}
                        sx={{ marginY: 2 }}
                      >
                        <Box
                          component='div'
                          className={styles.cardContent__subInfo}
                        >
                          <PersonIcon className={styles.subInfo__icon} />
                          <Typography
                            className={styles.subInfo__title}
                            variant='body1'
                          >
                            {plist.channelTitle}
                          </Typography>
                        </Box>

                        <Typography
                          className={styles.cardContent__ongoing}
                          variant='body1'
                        >
                          Ongoing
                        </Typography>
                      </Box>

                      <Typography variant='body2'>
                        {plist?.playlistDescription.substring(0, 80) ||
                          ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.' +
                            '...'}
                      </Typography>
                    </Box>

                    <Button
                      className={styles.cardContent__btn}
                      variant='contained'
                      disableRipple
                      fullWidth
                    >
                      Continue <ArrowRightAltIcon sx={{ marginLeft: 0.5 }} />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Playlists;
