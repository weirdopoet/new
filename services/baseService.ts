// services/baseService.ts
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "@thirdweb-dev/react";

export const useBaseTransactions = () => {
  const account = useActiveAccount();

  const uploadVideo = async (metadataUri: string, category: string) => {
    const transaction = prepareContractCall({
      contract: videoContract,
      method: "uploadVideo",
      params: [metadataUri, category],
    });

    const result = await sendTransaction({
      transaction,
      account: account!,
    });

    return result;
  };

  return { uploadVideo };
};
