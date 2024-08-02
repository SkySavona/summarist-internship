"use client";
import React from 'react';
import { useState } from 'react';
import AuthModal from './AuthModal';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const LoginButton: React.FC<ButtonProps> = ({ className = '', children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        className={`bg-[#2bd97c] text-[#032b41] w-full max-w-[300px] h-10 rounded text-base transition-colors duration-200 hover:bg-[#20ba68] flex items-center justify-center ${className}`}
        onClick={handleClick}
      >
        {children}
      </button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LoginButton;