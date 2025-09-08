
import React, { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import Card from './Card';
import PromptInput from './PromptInput';
import Spinner from './Spinner';
import ImageDisplay from './ImageDisplay';
import { PaintBrushIcon, UploadIcon } from './Icons';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};


const ImageEditor: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [originalImage, setOriginalImage] = useState<{ file: File; previewUrl: string } | null>(null);
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (originalImage?.previewUrl) {
                URL.revokeObjectURL(originalImage.previewUrl);
            }
            setOriginalImage({
                file,
                previewUrl: URL.createObjectURL(file)
            });
            setEditedImageUrl(null);
            setError(null);
        }
    };
    
    const handleEdit = useCallback(async () => {
        if (!originalImage) {
            setError("Please upload an image first.");
            return;
        }
        if (!prompt.trim()) {
            setError("Please enter an editing instruction.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImageUrl(null);

        try {
            const base64Data = await fileToBase64(originalImage.file);
            const url = await editImage(prompt, base64Data, originalImage.file.type);
            setEditedImageUrl(url);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, originalImage]);


    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-200">1. Upload Image</h2>
                        <label htmlFor="file-upload" className="w-full flex items-center justify-center px-4 py-6 bg-gray-700 text-gray-400 rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:bg-gray-600 hover:border-gray-500 transition">
                             <div className="text-center">
                                <UploadIcon className="mx-auto h-12 w-12" />
                                <span className="mt-2 block text-sm font-medium">{originalImage ? originalImage.file.name : 'Click to upload an image'}</span>
                            </div>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                        </label>
                    </div>

                     <div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-200">2. Describe Your Edit</h2>
                        <PromptInput
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Add a futuristic helmet to the person"
                            disabled={!originalImage}
                        />
                     </div>
                    
                    <button
                        onClick={handleEdit}
                        disabled={isLoading || !originalImage}
                        className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    >
                        {isLoading ? <Spinner /> : <PaintBrushIcon />}
                        <span className="ml-2">{isLoading ? 'Editing...' : 'Edit Image'}</span>
                    </button>
                    {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg text-sm">{error}</p>}
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <div className="w-1/2">
                        <h3 className="text-center font-semibold text-gray-400 mb-2">Original</h3>
                        <ImageDisplay imageUrl={originalImage?.previewUrl || null} />
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-center font-semibold text-gray-400 mb-2">Edited</h3>
                        <ImageDisplay imageUrl={editedImageUrl} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ImageEditor;
