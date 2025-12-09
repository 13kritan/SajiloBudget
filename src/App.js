import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App bg-slate-600 h-full w-full">
      <NavBar />
      <div className="page bg-slate-700">
        <Home />
      </div>
    </div>
  );
}

export default App;
