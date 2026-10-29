import React, { lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/themeContext";
import { photos, PHOTOS_PER_PAGE, photoThumb } from "./data/photos";
import Layout from "./layouts/Layout";
import { canPrefetch, whenIdle } from "./utils/idle";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";

// Home is the common landing page, so it stays in the main bundle. Every other
// page is its own chunk (Photography alone pulls in react-zoom-pan-pinch).
const pages = {
  projects: () => import("./pages/Projects"),
  experience: () => import("./pages/Experience"),
  photography: () => import("./pages/Photography"),
  contact: () => import("./pages/Contact"),
  about: () => import("./pages/About"),
  homelab: () => import("./pages/HomelabDiagrams"),
  diagram: () => import("./pages/DiagramViewer"),
  cipherTools: () => import("./pages/CipherTools"),
  caesar: () => import("./pages/CaesarCipher"),
  vigenere: () => import("./pages/VigenereCipher"),
  atbash: () => import("./pages/AtbashCipher"),
  rot13: () => import("./pages/Rot13Cipher"),
  notFound: () => import("./pages/NotFound"),
};

const Projects = lazy(pages.projects);
const Experience = lazy(pages.experience);
const Photography = lazy(pages.photography);
const Contact = lazy(pages.contact);
const About = lazy(pages.about);
const HomelabDiagrams = lazy(pages.homelab);
const DiagramViewer = lazy(pages.diagram);
const CipherTools = lazy(pages.cipherTools);
const CaesarCipher = lazy(pages.caesar);
const VigenereCipher = lazy(pages.vigenere);
const AtbashCipher = lazy(pages.atbash);
const Rot13Cipher = lazy(pages.rot13);
const NotFound = lazy(pages.notFound);

// Start fetching the landing route's chunk now, in parallel with React's first
// render, instead of waiting for <Suspense> to discover it.
const initialPage = ((): (() => Promise<unknown>) | undefined => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/resume") return undefined;
  if (path === "/projects") return pages.projects;
  if (path === "/projects/homelab") return pages.homelab;
  if (path.startsWith("/projects/homelab/")) return pages.diagram;
  if (path === "/projects/cipher-tools") return pages.cipherTools;
  // Top-level pages and the cipher tools are keyed by their last path segment.
  const name = (path.split("/").pop() ?? "") as keyof typeof pages;
  return name in pages ? pages[name] : pages.notFound;
})();
void initialPage?.();

const AppRoutes = (): React.JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/homelab" element={<HomelabDiagrams />} />
    <Route path="/projects/homelab/:diagramName" element={<DiagramViewer />} />
    <Route path="/projects/cipher-tools" element={<CipherTools />} />
    <Route path="/projects/cipher-tools/caesar" element={<CaesarCipher />} />
    <Route path="/projects/cipher-tools/vigenere" element={<VigenereCipher />} />
    <Route path="/projects/cipher-tools/atbash" element={<AtbashCipher />} />
    <Route path="/projects/cipher-tools/rot13" element={<Rot13Cipher />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/photography" element={<Photography />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/resume" element={<Navigate to="/resume.pdf" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App: React.FC = () => {
  // Once the landing page has settled, warm the other page chunks (so
  // navigation never waits on the network) and, 3s in, page 1 of the gallery
  // thumbnails so Photography feels instant. Skipped on Save-Data or slow
  // connections, where those bytes would compete with what's on screen.
  useEffect(() => {
    if (!canPrefetch()) return;
    const cancelChunks = whenIdle(() => {
      Object.values(pages).forEach((load) => { void load(); });
    }, 2000);
    let cancelThumbs: (() => void) | undefined;
    const timer = setTimeout(() => {
      cancelThumbs = whenIdle(() => {
        photos.slice(0, PHOTOS_PER_PAGE).forEach((f) => {
          const img = new Image();
          img.src = photoThumb(f);
        });
      });
    }, 3000);
    return () => {
      cancelChunks();
      clearTimeout(timer);
      cancelThumbs?.();
    };
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
