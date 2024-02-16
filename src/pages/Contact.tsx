import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = 'Contact - Sean Finch • SoCal';
  }, []);
  
  return <p>Contact page coming soon!</p>;
}

export default Contact;
