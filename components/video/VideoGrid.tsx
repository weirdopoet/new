import React from 'react';
import { Video } from '../../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
  onVideoSelect: (video: Video) => void;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-base-light rounded-lg h-40"></div>
    <div className="flex items-start mt-2 space-x-2">
      <div className="bg-base-light rounded-full h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-base-light rounded w-3/4"></div>
        <div className="h-4 bg-base-light rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const VideoGrid: React.FC<VideoGridProps> = ({ videos, isLoading, onVideoSelect }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-base-subtle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h2 className="text-xl font-semibold">No Videos Found</h2>
        <p>Try selecting another category or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
      ))}
    </div>
  );
};

export default VideoGrid;