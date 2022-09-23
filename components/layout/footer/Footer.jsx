import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Container, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box component='div' className={styles.footer} sx={{ paddingY: 1 }}>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
        }}
      >
        <Box
          className={styles.footer__text}
          sx={{ justifyContent: { xs: 'center', sm: 'start' } }}
        >
          Made with
          <FavoriteIcon
            className={styles.footer__loveIcon}
            sx={{ marginX: 0.8 }}
          />
          by&nbsp;
          <Link href='https://www.facebook.com/0xNaim'>
            <a target='_blank' className={styles.footer__link}>
              0xNaim
            </a>
          </Link>
        </Box>

        <Box component='div' sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Link href={'https://www.facebook.com/0xNaim'}>
            <a target={'_blank'}>
              <Tooltip title='Facebook'>
                <IconButton disableRipple>
                  <FacebookIcon className={styles.footer__socialIcons} />
                </IconButton>
              </Tooltip>
            </a>
          </Link>

          <Link href={'https://www.github.com/0xNaim'}>
            <a target='_blank'>
              <Tooltip title='GitHub'>
                <IconButton disableRipple>
                  <GitHubIcon className={styles.footer__socialIcons} />
                </IconButton>
              </Tooltip>
            </a>
          </Link>

          <Link href={'https://www.linkedin.com/in/0xnaim'}>
            <a target={'_blank'}>
              <Tooltip title='LinkedIn'>
                <IconButton disableRipple>
                  <LinkedInIcon className={styles.footer__socialIcons} />
                </IconButton>
              </Tooltip>
            </a>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
