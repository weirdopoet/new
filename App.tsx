
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import VideoGrid from './components/video/VideoGrid';
import UploadModal from './components/video/UploadModal';
import AgeGate from './components/ui/video/AgeGate';
import { useWeb3 } from './hooks/useWeb3';
import { Video, Category } from './types';
import { fetchVideos } from './services/blockchainService';
import VideoDetailView from './components/video/VideoDetailView';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { client, chain } from './services/thirdweb';
import { DatabaseService } from './services/database';
import { getFarcasterUser } from './services/farcaster';

const App: React.FC = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [isAgeVerified, setAgeVerified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { isConnected, connectWallet } = useWeb3();
  //const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const videosData = await DatabaseService.getVideos();
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const handleVideoUpload = async (videoFile: File, metadata: any) => {
    try {
      // 1. Upload to IPFS via ThirdWeb
      const { videoUri, metadataUri } = await uploadVideoToIPFS(videoFile, metadata);
      
      // 2. Store in Supabase
      const videoData = await DatabaseService.createVideo({
        title: metadata.title,
        description: metadata.description,
        video_url: videoUri,
        thumbnail_url: metadata.thumbnail,
        uploader_address: user.wallet_address,
        category: metadata.category,
      });

      // 3. Mint NFT on Base (optional)
      // await mintVideoNFT(metadataUri);

      // 4. Refresh videos
      loadVideos();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <ThirdwebProvider client={client} chain={chain}>
      <div className="app">
   
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
      </div>
    </ThirdwebProvider>
  );
};

export default App;