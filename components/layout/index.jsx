import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
