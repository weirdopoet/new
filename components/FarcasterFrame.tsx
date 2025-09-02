// components/FarcasterFrame.tsx
import React from 'react';

interface FrameProps {
  videoId: string;
  title: string;
  imageUrl: string;
}

export const VideoFrame: React.FC<FrameProps> = ({ videoId, title, imageUrl }) => {
  return (
    <div>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content={imageUrl} />
      <meta property="fc:frame:button:1" content="Watch Video" />
      <meta property="fc:frame:post_url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/video/${videoId}`} />
    </div>
  );
};
