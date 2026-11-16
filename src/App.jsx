import { Routes, Route, Link } from "react-router-dom";
import { Film } from "lucide-react";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">
          <Film size={28} />
          <span>Movie Explorer</span>
        </Link>

        <Link to="/" className="home-link">
          Home
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>

      <footer>
        <p>Movie Explorer | Powered by OMDb API</p>
      </footer>
    </div>
  );
}

export default App;