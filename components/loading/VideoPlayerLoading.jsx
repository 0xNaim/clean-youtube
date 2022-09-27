import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const VideoPlayerLoading = () => {
  return (
    <Box component='div'>
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{ width: '100%', height: { xs: '65vh', md: '76.5vh' } }}
      />

      <Box
        component='div'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Skeleton
          variant='text'
          animation='wave'
          width={'10%'}
          sx={{ fontSize: '2.5rem' }}
        />
        <Skeleton
          variant='text'
          animation='wave'
          width={'10%'}
          sx={{ fontSize: '2.5rem' }}
        />
      </Box>

      <Box component='div' sx={{marginTop: 1}}>
        <Skeleton variant='text' animation='wave' />
        <Skeleton variant='text' animation='wave' sx={{ fontSize: '3rem' }} />
      </Box>

      <Box component='div' sx={{ display: 'flex', marginTop: 2 }}>
        <Skeleton variant='circular' animation='wave' width={50} height={50} />
        <Box component='div' sx={{ width: '95%', marginLeft: 2 }}>
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='rectangular' animation='wave' height={100} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayerLoading;
