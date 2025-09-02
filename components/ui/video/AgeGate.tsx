import React from 'react';

interface AgeGateProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-base-light rounded-lg shadow-xl w-full max-w-md p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold mb-2 text-base-text">Content Warning</h2>
        <p className="text-base-subtle mb-6">
          This section may contain content that is not suitable for all ages.
          Please confirm you are 18 years of age or older to continue.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-full transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="bg-base-blue hover:bg-opacity-80 text-white font-bold py-2 px-8 rounded-full transition-colors"
          >
            I am 18+
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
