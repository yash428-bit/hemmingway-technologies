import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <CursorGlow />
      <Navigation />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
