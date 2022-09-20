import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from './OtherPlaylists.module.scss';

const OtherPlaylists = () => {
  const { playlist } = useSelector((state) => state.playlists) || {};

  const {
    query: { playlistId },
  } = useRouter();

  const playlistArray = Object.values(playlist);
  const otherPlaylists = playlistArray.filter(
    (playlist) => playlist.playlistId !== playlistId
  );

  return (
    <Container maxWidth='xl'>
      <Typography
        variant='h4'
        fontWeight={700}
        sx={{ fontSize: { xs: 22, md: 28 } }}
      >
        Other Playlists
      </Typography>
      <Divider sx={{ marginTop: 1 }} />

      <Grid container spacing={2} sx={{ marginTop: { xs: 0, sm: 1 } }}>
        {otherPlaylists?.map((playlist) => (
          <Grid item key={playlist.playlistId} xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.playlist__card}>
              <Box component='div' className={styles.playlist__cardMedia}>
                <Image
                  layout='responsive'
                  className={styles.playlist__cardThumbnail}
                  src={playlist?.playlistThumbnail?.url}
                  alt={playlist?.playlistTitle}
                  width={500}
                  height={300}
                />

                <PlayCircleFilledIcon
                  className={styles.playlist__card__playIcon}
                />

                <Box component='div' className={styles.card__iconsWrapper}>
                  <Tooltip title='Favorite'>
                    <IconButton sx={{ marginRight: 1 }}>
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
                  {playlist?.playlistTitle?.substring(0, 50)}
                </Typography>

                <Box component='div'>
                  <Box
                    component='div'
                    className={styles.cardContent__info}
                    sx={{ marginY: 2 }}
                  >
                    <Link
                      href={`https://www.youtube.com/channel/${playlist?.channelId}`}
                    >
                      <a target='_black' className={styles.link}>
                        <Box
                          component='div'
                          className={styles.cardContent__subInfo}
                        >
                          <PersonIcon className={styles.subInfo__icon} />
                          <Typography
                            className={styles.subInfo__title}
                            variant='body1'
                          >
                            {playlist?.channelName}
                          </Typography>
                        </Box>
                      </a>
                    </Link>

                    <Typography
                      className={styles.cardContent__ongoing}
                      variant='body1'
                    >
                      Ongoing
                    </Typography>
                  </Box>

                  <Typography variant='body2'>
                    {playlist?.playlistDescription?.substring(0, 80) ||
                      ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.' +
                        '...'}
                  </Typography>
                </Box>

                <Link href={`/player/${playlistId}`}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OtherPlaylists;
