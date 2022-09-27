import { Box, Skeleton } from '@mui/material';

const SideVideoHead = () => {
  return (
    <Box component='div'>
      <Skeleton variant='text' animation='wave' sx={{ fontSize: '2rem' }} />
      <Skeleton variant='text' animation='wave' width={'40%'} />
    </Box>
  );
};

export default SideVideoHead;
