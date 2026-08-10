import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlobBackground from '@/components/BlobBackground';
import Home from '@/pages/Home';
import Rigs from '@/pages/Rigs';
import Parts from '@/pages/Parts';
import Build from '@/pages/Build';
import About from '@/pages/About';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCarForm from '@/pages/admin/AdminCarForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BlobBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rigs" element={<Rigs />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/build" element={<Build />} />
          <Route path="/about" element={<About />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars/new"
            element={
              <ProtectedRoute>
                <AdminCarForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars/:id"
            element={
              <ProtectedRoute>
                <AdminCarForm />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
