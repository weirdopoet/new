// services/videoService.ts
import { upload } from "thirdweb/storage";
import { client } from "../services/thirdweb";

export const uploadVideoToIPFS = async (file: File, metadata: any) => {
  // Upload video file
  const videoUri = await upload({
    client,
    files: [file],
  });

  // Upload metadata
  const metadataUri = await upload({
    client,
    files: [metadata],
  });

  return { videoUri, metadataUri };
};
