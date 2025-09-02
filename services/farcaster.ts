// lib/farcaster.ts
import { getSSLHubRpcClient } from "@farcaster/hub-nodejs";

export const hubClient = getSSLHubRpcClient("https://nemes.farcaster.xyz:2283");

export const getFarcasterUser = async (fid: number) => {
  const userResult = await hubClient.getUserData({ fid });
  return userResult;
};
