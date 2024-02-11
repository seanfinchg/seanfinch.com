import '../index.css';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
      <div className='navbar'>
        <p>Home</p>
        <p>Projects</p>
        <p>Contact</p>
        <p>About</p>
      </div>
    </>
  );
};

export default Navbar;
