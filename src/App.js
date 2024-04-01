import Header from './components/Header.jsx'; // Import your Dashboard component
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx'; // Import your Dashboard component

function App() {
  return (
    <div className="bg-gray-900 p-8">
      <div className="container relative mx-auto text-white">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
