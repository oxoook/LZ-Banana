
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import Card from './Card';
import PromptInput from './PromptInput';
import Spinner from './Spinner';
import ImageDisplay from './ImageDisplay';
import { SparklesIcon } from './Icons';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-200">Describe Your Image</h2>
                    <PromptInput
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A cinematic shot of a raccoon astronaut on Mars"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="mt-4 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    >
                        {isLoading ? <Spinner /> : <SparklesIcon />}
                        <span className="ml-2">{isLoading ? 'Generating...' : 'Generate Image'}</span>
                    </button>
                    {error && <p className="text-red-400 mt-4 bg-red-900/50 p-3 rounded-lg text-sm">{error}</p>}
                </div>
                <div className="flex flex-col items-center justify-center">
                    <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} />
                </div>
            </div>
        </Card>
    );
};

export default ImageGenerator;
