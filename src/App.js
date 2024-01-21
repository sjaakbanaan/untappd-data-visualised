import logo from './logo.svg';
import './App.css';
import BeerList from './BeerList'; // Import your BeerList component

function App() {
  return (
    <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload..
        </p>
      <BeerList />
    </div>
  );
}

export default App;
