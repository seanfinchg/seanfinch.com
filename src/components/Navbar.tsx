import '../index.css';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
      <div className='flex flex-row flex-wrap justify-end w-full mx-6'>
        <p className='mx-4 text-center m-auto hover:font-bold'>Test</p>
      </div>
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
