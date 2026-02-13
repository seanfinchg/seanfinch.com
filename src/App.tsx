import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/themeContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DiagramViewer from "./pages/DiagramViewer";
import HomelabDiagrams from "./pages/HomelabDiagrams";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/homelab" element={<HomelabDiagrams />} />
    <Route path="/projects/homelab/:diagramName" element={<DiagramViewer />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/music" element={<Music />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/resume" element={<Navigate to="/resume.pdf" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App: React.FC = () => {
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
