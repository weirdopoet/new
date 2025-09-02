import { Video, Category, User, Comment } from '../types';

// --- MOCK DATA ---
const mockUsers: User[] = [
  { id: '1', name: 'CryptoCreator', address: '0x123...', avatar: `https://i.pravatar.cc/150?u=1`, followers: 1200 },
  { id: '2', name: 'NFTGamer', address: '0x456...', avatar: `https://i.pravatar.cc/150?u=2`, followers: 25000 },
  { id: '3', name: 'DeFiDiva', address: '0x789...', avatar: `https://i.pravatar.cc/150?u=3`, followers: 850 },
  { id: '4', name: 'BaseBuidler', address: '0xabc...', avatar: `https://i.pravatar.cc/150?u=4`, followers: 500000 },
];

const mockVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';

const mockVideos: Video[] = [
  {
    id: 'v1',
    title: 'My First Day on Base Network!',
    description: 'Exploring the Base ecosystem and all the cool dApps being built. This is the future!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[0], category: Category.IRL,
    views: 15000, likes: 800, timestamp: '2 days ago', 
    comments: [
        { id: 'c1', user: mockUsers[3], text: 'Welcome to Base! Great video.', timestamp: '1 day ago' },
        { id: 'c2', user: mockUsers[1], text: 'Awesome content, keep it up!', timestamp: '2 hours ago' },
    ]
  },
  {
    id: 'v2',
    title: 'Top 5 Web3 Games to Play Right Now',
    description: 'You won\'t believe how fun these on-chain games are. Get ready to grind for those NFTs!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1642104704074-af35d429a1b5?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[1], category: Category.ENTERTAINMENT,
    views: 125000, likes: 4200, timestamp: '5 days ago', comments: []
  },
  {
    id: 'v3',
    title: 'Hilarious Crypto Memes Compilation',
    description: 'When the market is down, the memes are up. A collection of the funniest skits and memes from crypto twitter.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1640062333630-f3b137a534e7?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[2], category: Category.SKITS,
    views: 88000, likes: 7100, timestamp: '1 week ago', comments: []
  },
  {
    id: 'v4',
    title: 'How to Deploy a Smart Contract on Base',
    description: 'A step-by-step tutorial for developers looking to get started building on Base. Let\'s BUIDL!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[3], category: Category.ENTERTAINMENT,
    views: 2.1e6, likes: 95000, timestamp: '3 weeks ago', comments: []
  },
  {
    id: 'v5',
    title: 'My Thoughts on the 18+ Section (A Warning)',
    description: 'Please be careful when browsing this section. Some content may be disturbing.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594755217922-793a0273a5a7?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[0], category: Category.EIGHTEEN_PLUS,
    views: 5000, likes: 150, timestamp: '1 day ago', comments: []
  },
  {
    id: 'v6',
    title: 'A Walk Through Downtown',
    description: 'Just a casual walk, exploring the city.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=500&q=80',
    videoUrl: mockVideoUrl, uploader: mockUsers[1], category: Category.IRL,
    views: 2200, likes: 120, timestamp: '4 days ago', comments: []
  }
];

// --- MOCK API CALLS ---

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchVideos = async (category: Category): Promise<Video[]> => {
  console.log(`Fetching videos for category: ${category}`);
  await delay(800); // Simulate network latency
  if (category === Category.ALL) {
    return mockVideos.filter(v => v.category !== Category.EIGHTEEN_PLUS);
  }
  return mockVideos.filter(video => video.category === category);
};

interface UploadData {
  title: string;
  description: string;
  category: Category;
  videoFile: File;
}

export const uploadVideo = async (data: UploadData): Promise<{ success: boolean; videoId: string }> => {
  console.log('Simulating on-chain video upload...');
  await delay(2500); // Simulate upload and block confirmation time
  
  // In a real app, you would upload the video to decentralized storage (e.g., IPFS/Arweave),
  // then call a smart contract to mint an NFT or create a record.

  console.log('Upload transaction successful!');
  const newVideoId = `v${mockVideos.length + 1}`;
  console.log(`New video ID: ${newVideoId}`, data);
  
  // We won't actually add it to our mock data array to keep the demo consistent on refresh.
  
  return { success: true, videoId: newVideoId };
};

export const addComment = async (videoId: string, commentText: string): Promise<Comment> => {
    console.log(`Simulating adding comment to video ${videoId}`);
    await delay(1000); // Simulate transaction time

    const video = mockVideos.find(v => v.id === videoId);
    if (!video) {
        throw new Error("Video not found");
    }

    const newComment: Comment = {
        id: `c${Date.now()}`,
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)], // Mock logged in user
        text: commentText,
        timestamp: 'Just now',
    };

    video.comments.unshift(newComment); // Add to the beginning of the array
    console.log("Comment added successfully", newComment);
    return newComment;
}