
import React from 'react';

interface MindMapConnectionProps {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  animated?: boolean;
  color?: string;
  thickness?: number;
  className?: string;
}

const MindMapConnection = ({
  id,
  startX,
  startY,
  endX,
  endY,
  animated = true,
  color = "#aaaaaa",
  thickness = 2,
  className
}: MindMapConnectionProps) => {
  // Simple straight line instead of bezier curve
  const path = `M ${startX} ${startY} L ${endX} ${endY}`;
  
  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0 }}
    >
      <path
        id={id}
        d={path}
        className={className}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
      />
    </svg>
  );
};

export default MindMapConnection;
