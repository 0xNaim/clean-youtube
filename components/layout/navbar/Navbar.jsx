import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import PlaylistForm from '../../playlist-form/PlaylistForm';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDrawerHandler = () => setOpenDrawer(!openDrawer);
  const toggleDialogHandler = () => setOpenDialog(!openDialog);

  return (
    <Box component='div'>
      <AppBar
        component='nav'
        position='static'
        className={styles.navbar}
        sx={{ paddingY: { xs: 0, md: 1.5 } }}
      >
        <Toolbar>
          <Box component='div'>
            <Link href='/'>
              <a className={styles.navbar__link}>
                <Typography
                  variant='h4'
                  className={styles.navbar__brand}
                  sx={{ fontSize: { xs: 22, md: 28 } }}
                >
                  Clean YouTube
                </Typography>
              </a>
            </Link>
            <Link href='https://www.facebook.com/0xNaim'>
              <a className={styles.navbar__link} target='_blank'>
                <Typography
                  variant='body1'
                  className={styles.navbar__subheading}
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  By 0xNaim
                </Typography>
              </a>
            </Link>
          </Box>

          <Box component='div' sx={{ marginLeft: 'auto' }}>
            <Link href='https://github.com/0xNaim/clean-youtube.git'>
              <a className={styles.navbar__link} target='_blank'>
                <Tooltip title='GitHub Repository'>
                  <IconButton sx={{ marginRight: { xs: 0, sm: 1 } }}>
                    <GitHubIcon className={styles.navbar__icon} />
                  </IconButton>
                </Tooltip>
              </a>
            </Link>

            <Button
              className={styles.navbar__btn}
              onClick={toggleDialogHandler}
              disableRipple
              variant='contained'
              sx={{ display: { xs: 'none', sm: 'inline-block' } }}
            >
              + Add Playlist
            </Button>
          </Box>

          <IconButton
            onClick={toggleDrawerHandler}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon className={styles.navbar__menuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <PlaylistForm open={openDialog} handleClose={toggleDialogHandler} />

      <Drawer
        variant='temporary'
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        open={openDrawer}
        onClose={toggleDrawerHandler}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: '70%', color: '#0ea5a0' },
        }}
      >
        <Box component='div'>
          <Typography
            variant='h5'
            textAlign='center'
            fontWeight={700}
            sx={{
              paddingY: 1,
              fontFamily: 'Dank Mono',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Clean YouTube
          </Typography>
          <Divider />
          <List>
            <ListItem
              disablePadding
              onClick={toggleDialogHandler}
              sx={{ '&:hover': { background: '#0EA5A01A' } }}
            >
              <ListItemButton>
                <ListItemText
                  primary='+ Add Playlist'
                  sx={{
                    '& 	.MuiListItemText-primary': {
                      fontFamily: 'Dank Mono',
                      fontWeight: 700,
                      fontSize: 18,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
