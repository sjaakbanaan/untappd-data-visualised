import Dashboard from './components/Dashboard.jsx'; // Import your Dashboard component

function App() {
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto p-8  text-white">
        <h1 className="text-center mb-5 text-4xl text-yellow-500 font-bold">
          Untappd Data Visualised
        </h1>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
