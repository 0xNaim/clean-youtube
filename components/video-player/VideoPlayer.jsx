import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/videos/videosSlice';
import Player from '../player/Player';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const {
    query: { playlistId },
  } = useRouter();
  const { playlists } = useSelector((state) => state.playlists || {});
  const {
    videos,
    activeVideoId: initialVideoId,
    activeVideoTitle: initialVideoTitle,
  } = useSelector((state) => state.videos || {});
  const dispatch = useDispatch();

  const [activeVideoIndex, setVideoActiveIndex] = useState(1);
  const [activeVideoId, setActiveVideoId] = useState(initialVideoId);
  const [activeVideoTitle, setActiveVideoTitle] = useState(initialVideoTitle);
  const [showMore, setShowMore] = useState(false);

  const singlePlaylist = playlists[playlistId];
  const { playlistTitle, playlistDescription, channelId, channelName } =
    singlePlaylist || {};
  const videosArray = Object.values(videos);

  console.log(playlistId);

  const handleState = (index, videoId, title) => {
    setVideoActiveIndex(index);
    setActiveVideoId(videoId);
    setActiveVideoTitle(title);
  };

  useEffect(() => {
    dispatch(fetchVideos(playlistId));
  }, [dispatch, playlistId]);

  return (
    <Container maxWidth='xl' sx={{ paddingY: 4 }} className={styles.video__player}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} className={styles.leftSide}>
          <Player videoId={activeVideoId} />
          <Box component='div' className={styles.leftSide__description}>
            <Link href={`https://www.youtube.com/playlist?list=${playlistId}`}>
              <a className={styles.leftSide__link} target={'_blank'}>
                <Typography className={styles.leftSide__link} variant='body2'>
                  {playlistTitle}
                </Typography>
              </a>
            </Link>
            <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
              {activeVideoTitle}
            </Typography>
          </Box>

          <Box component='div' className={styles.channel__description}>
            <Avatar>{channelName?.split(' ')[0]?.charAt(0)}</Avatar>

            <Box component='div' className={styles.description}>
              <Link href={`https://www.youtube.com/channel/${channelName}`}>
                <a className={styles.link} target={'_blank'}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 'normal',
                      fontSize: 16,
                      display: 'inline-block',
                    }}
                    title={channelName}
                  >
                    {channelName}
                  </Typography>
                </a>
              </Link>
              <Typography variant='body2'>{playlistTitle}</Typography>
              <Typography variant='body2'>
                {showMore
                  ? playlistDescription
                  : playlistDescription?.substring(0, 250)}
              </Typography>
              <Button
                disableRipple
                className={styles.description__showMore}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent className={styles.rightSide}>
              <Box component='div'>
                <Link
                  href={`https://www.youtube.com/playlist?list=${playlistId}`}
                >
                  <a target='_blank' className={styles.link}>
                    <Typography
                      title={playlistTitle}
                      variant='body2'
                      sx={{ fontWeight: 500 }}
                    >
                      {playlistTitle?.substring(0, 55) + '...'}
                    </Typography>
                  </a>
                </Link>

                <Box component='div' className={styles.rightSide__subHeading}>
                  <Link href={`https://www.youtube.com/channel/${channelId}`}>
                    <a
                      target={'_blank'}
                      className={styles.link}
                      title={channelName}
                    >
                      <Typography
                        className={styles.subHeading__channelName}
                        variant='body2'
                      >
                        {channelName}&nbsp;
                      </Typography>
                    </a>
                  </Link>
                  <Typography
                    className={styles.subHeading__totalVideos}
                    variant='body2'
                  >{`- ${activeVideoIndex} / ${videosArray?.length}`}</Typography>
                </Box>
              </Box>

              <Box component='div' className={styles.video__wrapper}>
                {videosArray?.map((video, index) => {
                  const {
                    contentDetails: { videoId },
                    title,
                    thumbnail,
                  } = video || {};

                  return (
                    <Box
                      className={
                        activeVideoIndex === index + 1
                          ? `${styles.video} ${styles.active}`
                          : `${styles.video}`
                      }
                      key={videoId}
                      onClick={() => handleState(index + 1, videoId, title)}
                      title={title}
                    >
                      <Typography variant='body2'>
                        {activeVideoIndex === index + 1 ? (
                          <PlayArrowIcon
                            sx={{ fontSize: 16, color: '#6b6b6b' }}
                          />
                        ) : (
                          index + 1
                        )}
                      </Typography>
                      <img
                        className={styles.video__thumbnail}
                        src={thumbnail.url}
                        alt={title}
                      />

                      <Box component={'div'}>
                        <Typography variant='body2' sx={{ fontWeight: 500 }}>
                          {title.substring(0, 50)}
                        </Typography>
                        <Typography
                          className={styles.video__channelName}
                          variant='body2'
                          sx={{ fontWeight: 500 }}
                        >
                          {channelName}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoPlayer;
