import React from 'react';
import { useWeb3 } from '../../hooks/useWeb3';

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  const { isConnected, connectWallet, userAddress } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <header className="bg-base-light shadow-md px-4 sm:px-6 py-3 flex items-center justify-between z-10 shrink-0">
      <div className="flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-blue" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-bold text-base-text hidden sm:block">ChainReel</h1>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for videos..."
            className="w-full bg-base-dark border border-base-light rounded-full py-2 px-4 text-base-subtle placeholder-base-subtle focus:outline-none focus:ring-2 focus:ring-base-blue"
          />
           <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-base-subtle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onUploadClick}
          className="bg-base-blue hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline">Upload</span>
        </button>
        {isConnected ? (
           <div className="bg-base-light rounded-full p-2 text-base-text font-mono text-sm">
            {formatAddress(userAddress)}
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
