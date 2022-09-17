import { Box } from '@mui/material';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';


const Layout = ({ children }) => {
  return (
    <Box component='div'>
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
