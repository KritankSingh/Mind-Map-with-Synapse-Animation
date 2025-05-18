
import { useState } from 'react';
import MindMap from '@/components/MindMap';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Mind Map of Creativity
        </h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col items-center">
        {showInstructions && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md text-gray-700 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold">How to Use</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500"
                onClick={() => setShowInstructions(false)}
              >
                Hide
              </Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click on the central node to expand the mind map</li>
              <li>Hover over nodes to see descriptions</li>
              <li>Click the central node again to collapse the map</li>
            </ul>
          </div>
        )}
        
        <div className="w-full max-w-xl aspect-square border border-gray-200 rounded-lg">
          <MindMap />
        </div>
      </main>
      
      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>Simple Mind Map Visualization</p>
      </footer>
    </div>
  );
};

export default Index;
