import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import Services from './components/Services';
import { ThemeProvider } from './components/ThemeContent';
import Underdevelopment from './components/Underdevelopment';
import AdminDash from './components/ADMIN/AdminDash';
import Upload_new_link from './components/Upload_new_link';
import LoginPage from './components/LogIn';

function App() {
  const token = localStorage.getItem('react_project_1234');

  function verifyToken() {
    return !!token;
  }

  return (
    <Router>
      <ThemeProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upload-link" element={<Upload_new_link />} />
            <Route 
              path="/admin" 
              element={verifyToken() ? <AdminDash /> : <Navigate to="/login" />} 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Underdevelopment />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
