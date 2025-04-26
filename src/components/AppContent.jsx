import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from './AppRoutes';

const AppContent = () => {
  const location = useLocation();
  const isWrappdRoute = location.pathname.startsWith('/wrappd');

  return (
    <>
      {!isWrappdRoute && <Header />}
      <div
        className={`${isWrappdRoute ? 'bg-gray-900 md:bg-wrappd-gradient' : 'px-1 md:px-6'}`}
      >
        <AppRoutes />
        {!isWrappdRoute && <Footer />}
      </div>
    </>
  );
};

export default AppContent;
