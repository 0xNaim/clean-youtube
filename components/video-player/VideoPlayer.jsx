import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Player from '../player/Player';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const { playlist } = useSelector((state) => state.playlists || {});
  const [activeIndex, setActiveIndex] = useState(1);

  const {
    query: { playlistId },
  } = useRouter();

  const singlePlaylist = playlist[playlistId];
  const { playlistTitle, channelId, channelName, playlistItems } =
    singlePlaylist || {};

  const videos = playlistItems || [];
  const [activeVideoId, setActiveVideoId] = useState(
    videos[0]?.contentDetails?.videoId || ''
  );
  const [videoTitle, setVideoTitle] = useState(videos[0]?.title || '');

  const handleState = (index, videoId, title) => {
    setActiveIndex(index);
    setActiveVideoId(videoId);
    setVideoTitle(title);
  };

  // useEffect(() => {
  //   setActiveVideoId(videos[0]?.contentDetails?.videoId);
  // }, [videos]);

  return (
    <Container maxWidth='xl' sx={{ paddingY: 4 }}>
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
              {videoTitle}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent className={styles.rightSide}>
              <Box component='div'>
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {playlistTitle?.substring(0, 55) + '...'}
                </Typography>

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
                  >{`- ${activeIndex} / ${videos?.length}`}</Typography>
                </Box>
              </Box>

              <Box component='div' className={styles.video__wrapper}>
                {videos &&
                  videos?.length > 0 &&
                  videos.map((video, index) => {
                    const {
                      contentDetails: { videoId },
                      title,
                      thumbnail,
                    } = video || {};

                    return (
                      <Box
                        className={
                          activeIndex === index + 1
                            ? `${styles.video} ${styles.active}`
                            : `${styles.video}`
                        }
                        key={videoId}
                        onClick={() => handleState(index + 1, videoId, title)}
                      >
                        <Typography variant='body2'>
                          {activeIndex === index + 1 ? (
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
