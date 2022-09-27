import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <Box component='div' className={styles.notFound}>
      <Image src='/404.gif' width={300} height={300} alt='404 Page Not Found' />

      <Typography
        gutterBottom
        variant='h4'
        fontWeight={500}
        sx={{ fontSize: { xs: 24, md: 36 } }}
      >
        404 Page Not Found
      </Typography>
      <Link href='/'>
        <a className={styles.notFound__link}>
          <Button className={styles.notFound__btn} disableRipple>
            Go to home
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default NotFound;
