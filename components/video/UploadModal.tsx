import React, { useState } from 'react';
import { Category } from '../../types';
import { uploadVideo } from '../../services/blockchainService';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.ENTERTAINMENT);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoFile) {
      setError('Video file and title are required.');
      return;
    }
    setError('');
    setIsUploading(true);
    try {
      await uploadVideo({ title, description, category, videoFile });
      // In a real app, you would likely refetch videos or update state
      onClose();
    } catch (err) {
      setError('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-base-light rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-base-subtle hover:text-base-text">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-base-text">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="videoFile" className="block text-sm font-medium text-base-subtle mb-1">Video File</label>
            <input 
              id="videoFile"
              type="file" 
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-base-subtle file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-base-blue file:text-white hover:file:bg-opacity-80" 
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-base-subtle">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-base-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-base-blue focus:border-base-blue" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-base-subtle">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-base-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-base-blue focus:border-base-blue"></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-base-subtle">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-1 block w-full bg-base-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-base-blue focus:border-base-blue">
              {Object.values(Category).filter(c => c !== Category.ALL && c !== Category.EIGHTEEN_PLUS).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isUploading} className="bg-base-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
