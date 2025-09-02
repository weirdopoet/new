import React, { useState } from 'react';
import { Video } from '../../types';

interface VideoCardProps {
  video: Video;
  onVideoSelect: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };

  return (
    <div 
      className="group cursor-pointer" 
      onClick={() => onVideoSelect(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-base-light">
        {isHovered && video.videoUrl ? (
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
        )}
      </div>
      <div className="flex items-start mt-3 space-x-3">
        <img src={video.uploader.avatar} alt={video.uploader.name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <h3 className="text-base font-semibold text-base-text leading-tight truncate">{video.title}</h3>
          <p className="text-sm text-base-subtle">{video.uploader.name}</p>
          <div className="flex items-center space-x-2 text-xs text-base-subtle mt-1">
            <span>{formatNumber(video.views)} views</span>
            <span>&bull;</span>
            <span>{formatNumber(video.likes)} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;