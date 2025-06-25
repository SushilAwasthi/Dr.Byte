// Choose.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { FaCheckCircle } from 'react-icons/fa';
import RotatingIcosahedron from './RotatingIcosahedron';  // Correct import
import SpaceBackground from './SpaceBackground';

const Choose: React.FC = () => {
  return (
    <div id='about' className='relative w-full h-auto md:h-screen pt-20 bg-[#05101c] pb-20'>
      {/* space background */}
      <div className="absolute top-0 left-0 w-full h-full z-[10]">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpaceBackground />
        </Canvas>
      </div>
      <h1 className='text-center text-lg lg:text-xl'>WHY CHOOSE US</h1>
      <h1 className='text-center text-2xl lg:text-4xl font-semibold mb-10'>Why Choose Dr.BYTE?</h1>
      <div className='flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center mt-5 space-y-5 md:space-y-0 md:space-x-40'>
        <div className='h-[400px] md:h-[500px]'>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingIcosahedron />
          </Canvas>
        </div>
        <div className='flex flex-col space-y-10'>
          <div className='flex flex-col justify-center items-center space-y-3 md:items-start md:justify-center'>
            <h1 className='text-xl lg:text-2xl font-semibold flex items-center justify-center space-x-2'><FaCheckCircle className='mr-4' /> Trusted Information</h1>
            <p>Get accurate, expert-verified medical advice you can rely on.</p>
          </div>
          <div className='flex flex-col justify-center items-center space-y-3 md:items-start'>
            <h1 className='text-xl lg:text-2xl font-semibold flex items-center'><FaCheckCircle className='mr-4' /> Confidential and Secure</h1>
            <p>Your privacy is our priority. All interactions are fully secure.</p>
          </div>
          <div className='flex flex-col justify-center items-center space-y-3 md:items-start'>
            <h1 className='text-xl lg:text-2xl font-semibold flex items-center'><FaCheckCircle className='mr-4'/> Easy to Use</h1>
            <p>User-friendly design for quick and easy access to health information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Choose;
