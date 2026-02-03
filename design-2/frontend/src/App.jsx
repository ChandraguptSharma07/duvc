import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmFestival from './pages/FilmFestival';
import Initiatives from './pages/Initiatives';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmfestival" element={<FilmFestival />} />
        <Route path="/initiatives/internetCollege" element={<Initiatives />} />
      </Routes>
    </Router>
  );
}

export default App;
