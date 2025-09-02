
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import VideoGrid from './components/video/VideoGrid';
import UploadModal from './components/video/UploadModal';
import AgeGate from './components/ui/AgeGate';
import { useWeb3 } from './hooks/useWeb3';
import { Video, Category } from './types';
import { fetchVideos } from './services/blockchainService';
import VideoDetailView from './components/video/VideoDetailView';

const App: React.FC = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [isAgeVerified, setAgeVerified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { isConnected, connectWallet } = useWeb3();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      const fetchedVideos = await fetchVideos(selectedCategory);
      setVideos(fetchedVideos);
      setIsLoading(false);
    };
    if (!selectedVideo) {
      loadVideos();
    }
  }, [selectedCategory, selectedVideo]);

  useEffect(() => {
    // Check local storage to see if user has already passed age gate
    const hasVerified = localStorage.getItem('ageVerified') === 'true';
    setAgeVerified(hasVerified);
  }, []);
  
  const handleCategorySelect = (category: Category) => {
    setSelectedVideo(null); // Go back to grid view when category changes
    if (category === Category.EIGHTEEN_PLUS && !isAgeVerified) {
      setShowAgeGate(true);
    } else {
      setSelectedCategory(category);
    }
  };
  
  const handleAgeVerification = () => {
    setAgeVerified(true);
    setShowAgeGate(false);
    setSelectedCategory(Category.EIGHTEEN_PLUS);
    localStorage.setItem('ageVerified', 'true');
  };

  const handleOpenUploadModal = () => {
    if (isConnected) {
      setUploadModalOpen(true);
    } else {
      // Prompt user to connect wallet first
      connectWallet(); 
    }
  };
  
  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleBackToGrid = () => {
    setSelectedVideo(null);
  };


  return (
    <div className="flex flex-col h-screen bg-base-dark font-sans">
      <Header onUploadClick={handleOpenUploadModal} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
        <main className="flex-1 overflow-y-auto">
          {selectedVideo ? (
            <VideoDetailView video={selectedVideo} onBack={handleBackToGrid} />
          ) : (
            <div className="p-4 sm:p-6 lg:p-8">
              <VideoGrid videos={videos} isLoading={isLoading} onVideoSelect={handleSelectVideo} />
            </div>
          )}
        </main>
      </div>
      {isUploadModalOpen && <UploadModal onClose={() => setUploadModalOpen(false)} />}
      {showAgeGate && (
        <AgeGate 
          onConfirm={handleAgeVerification}
          onCancel={() => setShowAgeGate(false)}
        />
      )}
    </div>
  );
};

export default App;