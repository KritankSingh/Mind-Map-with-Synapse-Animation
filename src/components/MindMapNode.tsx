
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from 'lucide-react';

interface MindMapNodeProps {
  id: string;
  label: string;
  type: 'main' | 'art' | 'science' | 'music' | 'writing' | 'design';
  icon: LucideIcon;
  size?: number;
  onClick?: () => void;
  isExpanded?: boolean;
  description?: string;
  className?: string;
  x: number;
  y: number;
}

const MindMapNode = ({
  id,
  label,
  type,
  icon: Icon,
  size = 80,
  onClick,
  isExpanded,
  description,
  className,
  x,
  y
}: MindMapNodeProps) => {
  const nodeStyle = {
    width: size,
    height: size,
    transform: `translate(${x - size/2}px, ${y - size/2}px)`,
  };
  
  // Simple color mapping
  const colorMap = {
    'main': 'bg-blue-500',
    'art': 'bg-orange-500',
    'science': 'bg-sky-500',
    'music': 'bg-purple-500',
    'writing': 'bg-indigo-500',
    'design': 'bg-green-500',
  };
  
  const bgColor = colorMap[type] || 'bg-gray-500';
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div 
            id={id}
            className={`absolute rounded-full ${bgColor} text-white shadow-md transition-all duration-300 cursor-pointer ${className}`} 
            style={nodeStyle}
            onClick={onClick}
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <Icon size={size * 0.3} />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </div>
        </TooltipTrigger>
        {description && (
          <TooltipContent side="top" className="max-w-[150px] text-center">
            <p>{description}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default MindMapNode;
