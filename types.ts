export enum Category {
  ALL = 'All',
  IRL = 'IRL',
  ENTERTAINMENT = 'Entertainment',
  SKITS = 'Skits',
  EIGHTEEN_PLUS = '18+',
}

export interface User {
  id: string;
  name: string;
  address: string;
  avatar: string;
  followers: number;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploader: User;
  category: Category;
  views: number;
  likes: number;
  timestamp: string;
  comments: Comment[];
}
