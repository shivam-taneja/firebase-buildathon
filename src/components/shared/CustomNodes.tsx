import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Play, Square, CheckCircle, AlertCircle } from 'lucide-react';

// Custom Input Node (Start)
export const InputNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div className={`
      relative px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200
      ${selected 
        ? 'border-green-400 shadow-green-200 bg-gradient-to-br from-green-50 to-green-100' 
        : 'border-green-300 bg-gradient-to-br from-green-50 to-white hover:shadow-xl'
      }
      min-w-[180px] max-w-[280px]
    `}>
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1 rounded-full bg-green-500">
          <Play className="h-3 w-3 text-white fill-white" />
        </div>
        <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Start</span>
      </div>
      <div className="text-sm font-medium text-gray-800 leading-tight">
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white shadow-md"
      />
    </div>
  );
});

// Custom Default Node (Process/Decision)
export const DefaultNode = memo(({ data, selected }: NodeProps) => {
  const isDecision = data.label.includes('?') || data.label.toLowerCase().includes('if');
  
  return (
    <div className={`
      relative px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200
      ${selected 
        ? isDecision 
          ? 'border-amber-400 shadow-amber-200 bg-gradient-to-br from-amber-50 to-amber-100'
          : 'border-blue-400 shadow-blue-200 bg-gradient-to-br from-blue-50 to-blue-100'
        : isDecision
          ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-white hover:shadow-xl'
          : 'border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl'
      }
      min-w-[180px] max-w-[280px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className={`w-3 h-3 border-2 border-white shadow-md ${
          isDecision ? 'bg-amber-500' : 'bg-blue-500'
        }`}
      />
      
      <div className="flex items-center gap-2 mb-1">
        <div className={`p-1 rounded-full ${isDecision ? 'bg-amber-500' : 'bg-blue-500'}`}>
          {isDecision ? (
            <AlertCircle className="h-3 w-3 text-white" />
          ) : (
            <Square className="h-3 w-3 text-white fill-white" />
          )}
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wide ${
          isDecision ? 'text-amber-700' : 'text-blue-700'
        }`}>
          {isDecision ? 'Decision' : 'Process'}
        </span>
      </div>
      
      <div className="text-sm font-medium text-gray-800 leading-tight">
        {data.label}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className={`w-3 h-3 border-2 border-white shadow-md ${
          isDecision ? 'bg-amber-500' : 'bg-blue-500'
        }`}
      />
    </div>
  );
});

// Custom Output Node (End/Return)
export const OutputNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div className={`
      relative px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-200
      ${selected 
        ? 'border-purple-400 shadow-purple-200 bg-gradient-to-br from-purple-50 to-purple-100' 
        : 'border-purple-300 bg-gradient-to-br from-purple-50 to-white hover:shadow-xl'
      }
      min-w-[180px] max-w-[280px]
    `}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 border-2 border-white shadow-md"
      />
      
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1 rounded-full bg-purple-500">
          <CheckCircle className="h-3 w-3 text-white" />
        </div>
        <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">End</span>
      </div>
      
      <div className="text-sm font-medium text-gray-800 leading-tight">
        {data.label}
      </div>
    </div>
  );
});

// Node types mapping
export const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

InputNode.displayName = 'InputNode';
DefaultNode.displayName = 'DefaultNode';
OutputNode.displayName = 'OutputNode';