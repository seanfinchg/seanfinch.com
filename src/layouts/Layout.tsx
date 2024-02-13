import "../index.css";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <main className="pt-16">{children}</main>
    <Footer />
  </>
);

export default Layout;
