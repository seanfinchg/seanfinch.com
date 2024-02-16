import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function Contact() {
  const { theme } = useTheme();
  useEffect(() => {
    document.title = 'Contact - Sean Finch • SoCal';
  }, []);
  
  return <p>Contact page coming soon!</p>;
}

export default Contact;
