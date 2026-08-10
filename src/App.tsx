import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlobBackground from '@/components/BlobBackground';
import Home from '@/pages/Home';
import Rigs from '@/pages/Rigs';
import Parts from '@/pages/Parts';
import Build from '@/pages/Build';
import About from '@/pages/About';

function App() {
  return (
    <BrowserRouter>
      <BlobBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rigs" element={<Rigs />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/build" element={<Build />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
