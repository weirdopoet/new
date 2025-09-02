import { useState, useEffect, useCallback } from 'react';

// A global state for our singleton hook
let isConnectedGlobal = false;
let userAddressGlobal = '';
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(listener => listener());
};

// In a real app, this would use ethers.js, wagmi, etc.
// For this simulation, we'll create a simple singleton state manager.
export const useWeb3 = () => {
  const [_, setTick] = useState(0);

  const forceUpdate = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    listeners.add(forceUpdate);
    return () => {
      listeners.delete(forceUpdate);
    };
  }, [forceUpdate]);

  const connectWallet = () => {
    if (!isConnectedGlobal) {
      console.log('Simulating wallet connection...');
      // Generate a mock address
      const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      userAddressGlobal = mockAddress;
      isConnectedGlobal = true;
      console.log(`Wallet connected: ${userAddressGlobal}`);
      notify();
    }
  };

  const signTransaction = async () => {
    if (!isConnectedGlobal) {
      console.error('Wallet not connected');
      throw new Error('Wallet not connected');
    }
    console.log('Simulating transaction signing...');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    console.log('Transaction signed.');
    return { success: true };
  };

  return { 
    isConnected: isConnectedGlobal, 
    userAddress: userAddressGlobal,
    connectWallet, 
    signTransaction 
  };
};
