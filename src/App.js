import './App.css';
import { PrivateRoute } from "./components/PrivateRoute";
import Home from './pages/Home';
import NewIncome from './pages/NewIncome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsPage from './pages/Report';
import Authenticate from './pages/Authenticate';
import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"

function App() {
  return (
    <div className="App flex flex-col bg-slate-600 min-h-screen w-full overflow-auto">
      <Router>
        <div className="page flex-1 bg-slate-700 min-h-screen">
          <Routes>
            {/* Routes WITH NavBar */}
            <Route element={<MainLayout />}>
              <Route path="/" element={ <PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/newIncome" element={<PrivateRoute><NewIncome /></PrivateRoute>} />
              <Route path="/report" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
            </Route>

            {/* Routes WITHOUT NavBar */}
            <Route element={<AuthLayout />}>
              <Route path="/authenticate/*" element={<Authenticate />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>


  );
}

export default App;
