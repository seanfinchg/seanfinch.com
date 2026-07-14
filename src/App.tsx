import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/themeContext";
import { photos, PHOTOS_PER_PAGE, photoThumb } from "./data/photos";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Music from "./pages/Music";
import Photography from "./pages/Photography";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HomelabDiagrams from "./pages/HomelabDiagrams";
import CipherTools from "./pages/CipherTools";
import CaesarCipher from "./pages/CaesarCipher";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

const AppRoutes = (): React.JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/homelab" element={<HomelabDiagrams />} />
    <Route path="/projects/cipher-tools" element={<CipherTools />} />
    <Route path="/projects/cipher-tools/caesar" element={<CaesarCipher />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/music" element={<Music />} />
    <Route path="/photography" element={<Photography />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/resume" element={<Navigate to="/resume.pdf" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App: React.FC = () => {
  // Background-preload page 1 photos 3s after app load so Photography feels instant
  useEffect(() => {
    const timer = setTimeout(() => {
      photos.slice(0, PHOTOS_PER_PAGE).forEach((f) => {
        const img = new Image();
        img.src = photoThumb(f);
      });
    }, 3000);
    return () => { clearTimeout(timer); };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
