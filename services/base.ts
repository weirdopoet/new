// lib/base.ts
import { base, baseSepolia } from "thirdweb/chains";

export const getBaseChain = () => {
  return process.env.NODE_ENV === 'production' ? base : baseSepolia;
};

// Base-specific contract addresses
export const BASE_CONTRACTS = {
  VIDEO_PLATFORM: "0x...", // Your main contract
  TOKEN_REWARDS: "0x...",  // Reward token contract
  NFT_COLLECTION: "0x...", // Video NFT collection
};
