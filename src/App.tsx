import React, { lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/themeContext";
import { featuredStack, photoLarge, photos, PHOTOS_PER_PAGE, photoThumb } from "./data/photos";
import Layout from "./layouts/Layout";
import { canPrefetch, whenIdle } from "./utils/idle";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

// The small content pages (5-9 KB each) stay in the main bundle: splitting
// them saved almost nothing and added a network round trip when landing on
// them directly. The heavy or rarely visited pages are their own chunks;
// Photography alone pulls in react-zoom-pan-pinch.
const pages = {
  photography: () => import("./pages/Photography"),
  homelab: () => import("./pages/HomelabDiagrams"),
  diagram: () => import("./pages/DiagramViewer"),
  cipherTools: () => import("./pages/CipherTools"),
  caesar: () => import("./pages/CaesarCipher"),
  vigenere: () => import("./pages/VigenereCipher"),
  atbash: () => import("./pages/AtbashCipher"),
  rot13: () => import("./pages/Rot13Cipher"),
};

const Photography = lazy(pages.photography);
const HomelabDiagrams = lazy(pages.homelab);
const DiagramViewer = lazy(pages.diagram);
const CipherTools = lazy(pages.cipherTools);
const CaesarCipher = lazy(pages.caesar);
const VigenereCipher = lazy(pages.vigenere);
const AtbashCipher = lazy(pages.atbash);
const Rot13Cipher = lazy(pages.rot13);

// Start fetching the landing route's chunk now, in parallel with React's first
// render, instead of waiting for <Suspense> to discover it.
const initialPage = ((): (() => Promise<unknown>) | undefined => {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/photography") return pages.photography;
  if (path === "/projects/homelab") return pages.homelab;
  if (path.startsWith("/projects/homelab/")) return pages.diagram;
  if (path === "/projects/cipher-tools") return pages.cipherTools;
  if (path.startsWith("/projects/cipher-tools/")) {
    const name = path.slice("/projects/cipher-tools/".length);
    if (name === "caesar" || name === "vigenere" || name === "atbash" || name === "rot13") return pages[name];
  }
  return undefined;
})();
void initialPage?.();

// The Photography hero is its LCP image, but its <img> only exists once that
// page's chunk has loaded and rendered. Preload it now so the two download in
// parallel. Same URL as the hero's src, so the browser reuses the response.
if (initialPage === pages.photography && featuredStack) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = photoLarge(featuredStack.files[featuredStack.cover] ?? featuredStack.files[0] ?? "");
  link.fetchPriority = "high";
  document.head.appendChild(link);
}

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
  // Once the landing page has fully loaded and settled, warm the other page
  // chunks (so navigation never waits on the network) and page 1 of the
  // gallery thumbnails (so Photography feels instant). Waiting for `load` plus
  // 3s keeps these bytes from competing with fonts and the LCP element; idle
  // callbacks alone fire too early, while the network is still busy. Skipped
  // on Save-Data or slow connections.
  useEffect(() => {
    if (!canPrefetch()) return;
    let timer: number | undefined;
    let cancelIdle: (() => void) | undefined;
    const warm = (): void => {
      timer = window.setTimeout(() => {
        cancelIdle = whenIdle(() => {
          Object.values(pages).forEach((load) => { void load(); });
          photos.slice(0, PHOTOS_PER_PAGE).forEach((f) => {
            const img = new Image();
            img.src = photoThumb(f);
          });
        });
      }, 3000);
    };
    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });
    return () => {
      window.removeEventListener("load", warm);
      window.clearTimeout(timer);
      cancelIdle?.();
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
