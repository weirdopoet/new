import React, { useState } from 'react';
import { Video, Comment } from '../../types';
import { addComment } from '../../services/blockchainService';
import { useWeb3 } from '../../hooks/useWeb3';

interface VideoDetailViewProps {
  video: Video;
  onBack: () => void;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
};

const VideoDetailView: React.FC<VideoDetailViewProps> = ({ video, onBack }) => {
  const [comments, setComments] = useState<Comment[]>(video.comments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet } = useWeb3();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isConnected) {
        connectWallet();
        return;
    }

    setIsSubmitting(true);
    try {
      const addedComment = await addComment(video.id, newComment);
      setComments(prev => [addedComment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Here you could show an error toast to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-grow lg:w-2/3 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Back Button */}
        <button onClick={onBack} className="flex items-center space-x-2 text-base-subtle hover:text-base-text mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to videos</span>
        </button>

        {/* Video Player Placeholder */}
        <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center">
          <p className="text-base-subtle">Video player for "{video.title}"</p>
        </div>

        {/* Video Info */}
        <h1 className="text-2xl sm:text-3xl font-bold text-base-text">{video.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
                <img src={video.uploader.avatar} alt={video.uploader.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-base-text">{video.uploader.name}</p>
                    <p className="text-sm text-base-subtle">{video.uploader.followers} followers</p>
                </div>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors text-sm">Follow</button>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-1 text-base-subtle">
                    <span>{formatNumber(video.views)} views</span>
                    <span>&bull;</span>
                    <span>{video.timestamp}</span>
                </div>
                 <button className="bg-base-light hover:bg-base-dark text-base-text font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{formatNumber(video.likes)}</span>
                </button>
            </div>
        </div>
        
        {/* Description */}
        <div className="bg-base-light p-4 rounded-lg">
            <p className="text-base-subtle">{video.description}</p>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="flex-shrink-0 lg:w-1/3 bg-base-light p-4 sm:p-6 lg:p-8 flex flex-col border-l border-gray-700">
          <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex items-start space-x-3">
                  <img src="https://i.pravatar.cc/150?u=current_user" alt="current user" className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                        className="w-full bg-base-dark border border-gray-600 rounded-md shadow-sm p-2 focus:outline-none focus:ring-base-blue focus:border-base-blue"
                      />
                      <div className="flex justify-end mt-2">
                        <button type="submit" disabled={isSubmitting || !newComment.trim()} className="bg-base-blue hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Commenting...' : 'Comment'}
                        </button>
                      </div>
                  </div>
              </div>
          </form>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                    <img src={comment.user.avatar} alt={comment.user.name} className="h-10 w-10 rounded-full object-cover"/>
                    <div>
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold text-sm text-base-text">{comment.user.name}</p>
                            <p className="text-xs text-base-subtle">{comment.timestamp}</p>
                        </div>
                        <p className="text-base-text text-sm">{comment.text}</p>
                    </div>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default VideoDetailView;
