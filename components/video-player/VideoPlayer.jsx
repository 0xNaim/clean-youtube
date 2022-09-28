import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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
import { fetchRecentPlaylist } from '../../redux/recent/recentSlice';
import { fetchVideos } from '../../redux/videos/videosSlice';
import SideVideoHead from '../loading/SideVideoHead';
import SideVideoLoading from '../loading/SideVideoLoading';
import VideoPlayerLoading from '../loading/VideoPlayerLoading';
import Player from '../player/Player';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const {
    query: { playlistId },
  } = useRouter();
  const { videos, isLoading } = useSelector((state) => state.videos || {});
  const { recents } = useSelector((state) => state.recents || {});
  const dispatch = useDispatch();

  const [activeVideoIndex, setVideoActiveIndex] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const [activeVideoId, setActiveVideoId] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  const {
    playlistVideos,
    channelId,
    channelName,
    playlistTitle,
    playlistDescription,
  } = videos || {};

  const handlePrev = () => {
    setVideoActiveIndex((prev) => prev - 1);
    setActiveVideoId(
      playlistVideos[activeVideoIndex - 2]?.contentDetails?.videoId
    );
    setActiveVideoTitle(playlistVideos[activeVideoIndex - 2]?.title);
  };

  const handleNext = () => {
    setVideoActiveIndex((prev) => prev + 1);
    setActiveVideoId(playlistVideos[activeVideoIndex]?.contentDetails?.videoId);
    setActiveVideoTitle(playlistVideos[activeVideoIndex]?.title);
  };

  const handleState = (index, videoId, title) => {
    setVideoActiveIndex(index);
    setActiveVideoId(videoId);
    setActiveVideoTitle(title);
  };

  useEffect(() => {
    dispatch(fetchVideos(playlistId));
  }, [dispatch, playlistId]);

  useEffect(() => {
    setActiveVideoId(
      playlistVideos && playlistVideos[0]?.contentDetails?.videoId
    );
    setActiveVideoTitle(playlistVideos && playlistVideos[0]?.title);
  }, [playlistVideos]);

  useEffect(() => {
    if (playlistId && !recents[playlistId]) {
      dispatch(fetchRecentPlaylist(playlistId));
    }
  }, [dispatch, playlistId, recents]);

  return (
    <>
      {/* {isLoading && (
        <Box component='div' sx={{ textAlign: 'center', marginY: 5 }}>
          <Typography variant='body1'>Loading...</Typography>
        </Box>
      )} */}

      <Container
        maxWidth='xl'
        sx={{ paddingY: 4 }}
        className={styles.video__player}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} className={styles.leftSide}>
            {!isLoading && playlistVideos ? (
              <>
                <Player videoId={activeVideoId} />

                <Box component='div' className={styles.leftSide__btnGroup}>
                  <Button
                    onClick={handlePrev}
                    className={styles.btnGroup__btn}
                    disableRipple
                    disabled={activeVideoIndex === 1}
                    sx={{ paddingRight: 2.5 }}
                  >
                    <NavigateBeforeIcon />
                    Prev
                  </Button>
                  <Button
                    onClick={handleNext}
                    className={styles.btnGroup__btn}
                    disableRipple
                    disabled={activeVideoIndex === playlistVideos?.length}
                    sx={{ paddingLeft: 2.5 }}
                  >
                    Next <NavigateNextIcon />
                  </Button>
                </Box>
                <Box component='div' className={styles.leftSide__description}>
                  <Link
                    href={`https://www.youtube.com/playlist?list=${playlistId}`}
                  >
                    <a className={styles.leftSide__link} target={'_blank'}>
                      <Typography
                        className={styles.leftSide__link}
                        variant='body2'
                      >
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
                    <Link
                      href={`https://www.youtube.com/channel/${channelName}`}
                    >
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
                    {playlistDescription && (
                      <Button
                        disableRipple
                        className={styles.description__showMore}
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'Show Less' : 'Show More'}
                      </Button>
                    )}
                  </Box>
                </Box>
              </>
            ) : (
              <VideoPlayerLoading />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className={styles.rightSide}>
                {!isLoading && playlistVideos ? (
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

                    <Box
                      component='div'
                      className={styles.rightSide__subHeading}
                    >
                      <Link
                        href={`https://www.youtube.com/channel/${channelId}`}
                      >
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
                      >{`- ${activeVideoIndex} / ${playlistVideos?.length}`}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <SideVideoHead />
                )}

                {!isLoading && playlistVideos ? (
                  <Box component='div' className={styles.video__wrapper}>
                    {playlistVideos?.map((video, index) => {
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
                            src={thumbnail?.url}
                            alt={title}
                          />

                          <Box component={'div'}>
                            <Typography
                              variant='body2'
                              sx={{ fontWeight: 500 }}
                            >
                              {title?.substring(0, 50)}
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
                ) : (
                  <>
                    <SideVideoLoading />
                    <SideVideoLoading />
                    <SideVideoLoading />
                    <SideVideoLoading />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VideoPlayer;
