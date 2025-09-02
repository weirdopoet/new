// hooks/useContract.ts
import { getContract } from "thirdweb";
import { client, chain } from "../services/thirdweb";

export const useVideoContract = () => {
  const contract = getContract({
    client,
    chain,
    address: "0x...", // Your deployed contract address
  });

  return contract;
};