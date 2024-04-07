import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx';
import Uploader from './components/Uploader/Uploader.jsx';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 p-8">
        <div className="container relative mx-auto text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Uploader />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
