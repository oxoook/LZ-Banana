
import React, { useState } from 'react';
import { Tab } from './types';
import ImageGenerator from './components/ImageGenerator';
import ImageEditor from './components/ImageEditor';
import TabButton from './components/TabButton';
import { SparklesIcon, PaintBrushIcon, PhotoIcon } from './components/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GENERATE);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <PhotoIcon className="w-12 h-12 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
              LIZHOU Image
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Create and edit images with the power of generative AI.
          </p>
        </header>

        <div className="flex justify-center border-b border-gray-700 mb-8">
          <TabButton
            label="Generate"
            icon={<SparklesIcon />}
            isActive={activeTab === Tab.GENERATE}
            onClick={() => setActiveTab(Tab.GENERATE)}
          />
          <TabButton
            label="Edit"
            icon={<PaintBrushIcon />}
            isActive={activeTab === Tab.EDIT}
            onClick={() => setActiveTab(Tab.EDIT)}
          />
        </div>

        <main>
          {activeTab === Tab.GENERATE && <ImageGenerator />}
          {activeTab === Tab.EDIT && <ImageEditor />}
        </main>
      </div>
    </div>
  );
};

export default App;
