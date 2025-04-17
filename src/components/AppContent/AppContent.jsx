import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import AppRoutes from '../AppRoutes/AppRoutes';

const AppContent = () => {
  const location = useLocation();
  const isSharedRoute = location.pathname.startsWith('/shared');

  return (
    <>
      {!isSharedRoute && <Header />}
      <div className="mx-1 md:mx-6">
        <AppRoutes />
        {!isSharedRoute && <Footer />}
      </div>
    </>
  );
};

export default AppContent;
