import { Box, Skeleton } from "@mui/material";

const SideVideoLoading = () => {
  return (
    <Box
      component='div'
      sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}
    >
      <Box component='div' sx={{ width: '40%' }}>
        <Skeleton
          variant='rectangular'
          animation='wave'
          sx={{ height: '75px' }}
        />
      </Box>
      <Box component='div' sx={{ width: '58%' }}>
        <Skeleton variant='text' animation='wave' sx={{ fontSize: '2rem' }} />
        <Skeleton variant='text' animation='wave' width={'40%'} />
      </Box>
    </Box>
  );
};

export default SideVideoLoading;
