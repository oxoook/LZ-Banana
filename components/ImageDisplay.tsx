
import React from 'react';
import Spinner from './Spinner';
import { PhotoIcon } from './Icons';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading = false }) => {
  return (
    <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700 transition-all duration-300">
      {isLoading ? (
        <div className="text-center text-gray-400">
            <Spinner />
            <p className="mt-2">Conjuring pixels...</p>
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt="Generated content" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center text-gray-500">
          <PhotoIcon className="w-16 h-16 mx-auto" />
          <p className="mt-2 text-sm">Your image will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
