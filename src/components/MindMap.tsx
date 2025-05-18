
import React, { useState, useEffect, useRef } from 'react';
import MindMapNode from './MindMapNode';
import MindMapConnection from './MindMapConnection';
import { Lightbulb, Book, Brain, Music, Pen, Palette } from 'lucide-react';

// Define the structure of our mind map nodes
interface MindMapNodeData {
  id: string;
  label: string;
  type: 'main' | 'art' | 'science' | 'music' | 'writing' | 'design';
  icon: typeof Lightbulb;
  description: string;
  x: number;
  y: number;
  parentId?: string;
}

interface MindMapConnectionData {
  id: string;
  sourceId: string;
  targetId: string;
}

const MindMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 });
  
  // Initialize nodes
  const mainNodeRadius = 40;
  const branchNodeRadius = 30;
  const expandedDistance = 150;
  
  // Define our mind map data
  const [nodes, setNodes] = useState<MindMapNodeData[]>([
    {
      id: 'main',
      label: 'Creativity',
      type: 'main',
      icon: Lightbulb,
      description: 'Creative thought',
      x: centerPosition.x,
      y: centerPosition.y,
    },
    {
      id: 'art',
      label: 'Art',
      type: 'art',
      icon: Palette,
      description: 'Visual expression',
      x: centerPosition.x,
      y: centerPosition.y,
      parentId: 'main',
    },
    {
      id: 'science',
      label: 'Science',
      type: 'science',
      icon: Brain,
      description: 'Problem-solving',
      x: centerPosition.x,
      y: centerPosition.y,
      parentId: 'main',
    },
    {
      id: 'music',
      label: 'Music',
      type: 'music',
      icon: Music,
      description: 'Sound expression',
      x: centerPosition.x,
      y: centerPosition.y,
      parentId: 'main',
    },
    {
      id: 'writing',
      label: 'Writing',
      type: 'writing',
      icon: Pen,
      description: 'Written expression',
      x: centerPosition.x,
      y: centerPosition.y,
      parentId: 'main',
    },
    {
      id: 'design',
      label: 'Design',
      type: 'design',
      icon: Book,
      description: 'Problem solutions',
      x: centerPosition.x,
      y: centerPosition.y,
      parentId: 'main',
    },
  ]);

  // Connections between nodes
  const [connections, setConnections] = useState<MindMapConnectionData[]>([]);
  
  // Update map size and center position on mount and resize
  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapSize({ width, height });
        setCenterPosition({ x: width / 2, y: height / 2 });
      }
    };
    
    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    
    return () => {
      window.removeEventListener('resize', updateMapSize);
    };
  }, []);
  
  // Update node positions based on center and expanded state
  useEffect(() => {
    if (centerPosition.x === 0 && centerPosition.y === 0) return;
    
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === 'main') {
          return { ...node, x: centerPosition.x, y: centerPosition.y };
        }
        
        // Calculate positions for branch nodes
        if (isExpanded) {
          const angle = getNodeAngle(node.id);
          const distance = expandedDistance;
          
          return {
            ...node,
            x: centerPosition.x + Math.cos(angle) * distance,
            y: centerPosition.y + Math.sin(angle) * distance,
          };
        } else {
          // When collapsed, all nodes are at the center
          return { ...node, x: centerPosition.x, y: centerPosition.y };
        }
      });
    });
    
    // Update connections based on node positions
    if (isExpanded) {
      const newConnections = nodes
        .filter(node => node.id !== 'main' && node.parentId)
        .map(node => ({
          id: `connection-${node.parentId}-${node.id}`,
          sourceId: node.parentId!,
          targetId: node.id,
        }));
      
      setConnections(newConnections);
    } else {
      setConnections([]);
    }
  }, [centerPosition, isExpanded]);
  
  // Helper function to determine angle for each branch node
  const getNodeAngle = (nodeId: string): number => {
    const angleMap: { [key: string]: number } = {
      'art': Math.PI * 1.7, // top-left
      'science': Math.PI * 0.3, // top-right
      'music': Math.PI * 0.7, // right
      'writing': Math.PI * 1.3, // bottom
      'design': Math.PI, // left
    };
    
    return angleMap[nodeId] || 0;
  };
  
  // Toggle expansion when main node is clicked
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-full overflow-hidden bg-slate-100 rounded-lg border border-slate-200"
    >
      {/* Render connections */}
      {connections.map(conn => {
        const sourceNode = nodes.find(n => n.id === conn.sourceId);
        const targetNode = nodes.find(n => n.id === conn.targetId);
        
        if (!sourceNode || !targetNode) return null;
        
        return (
          <MindMapConnection 
            key={conn.id}
            id={conn.id}
            startX={sourceNode.x}
            startY={sourceNode.y}
            endX={targetNode.x}
            endY={targetNode.y}
            animated={false}
            thickness={1}
          />
        );
      })}
      
      {/* Render nodes */}
      {nodes.map(node => (
        <MindMapNode
          key={node.id}
          id={node.id}
          label={node.label}
          type={node.type}
          icon={node.icon}
          size={node.id === 'main' ? mainNodeRadius : branchNodeRadius}
          onClick={node.id === 'main' ? toggleExpand : undefined}
          isExpanded={isExpanded && node.id === 'main'}
          description={node.description}
          className={node.id !== 'main' && !isExpanded ? 'opacity-0 scale-0' : ''}
          x={node.x}
          y={node.y}
        />
      ))}
    </div>
  );
};

export default MindMap;
