import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewIncome from './pages/NewIncome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsPage from './pages/Report';
import Authenticate from './pages/Authenticate';
import useIsAuthPage from './components/DetectAuthPage';

function App() {
  return (
    <div className="App flex flex-col bg-slate-600 h-full w-full overflow-auto">
      <Router>
        { <NavBar />}
        <div className="page flex-1 bg-slate-700 h-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newIncome" element={<NewIncome />} />
            <Route path="/report" element={<ReportsPage />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </div>
      </Router>
    </div>


  );
}

export default App;
