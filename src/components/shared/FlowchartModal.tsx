import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { FlowchartEdge, FlowchartNode } from '@/types/explanation';
import { useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  Panel,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes } from './CustomEdges';
import { nodeTypes } from './CustomNodes';
import './flowchart.css';

interface FlowchartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes?: FlowchartNode[];
  edges?: FlowchartEdge[];
}

const FlowchartModal = ({ open, onOpenChange, nodes = [], edges = [] }: FlowchartModalProps) => {
  const [miniMapVisible, setMiniMapVisible] = useState(true);

  // Create expanded nodes with better spacing for fullscreen
  const expandedNodes = useMemo(() => {
    if (!nodes.length) return [];

    // Calculate scaling factors for better spacing

    return nodes.map(node => ({
      ...node,
      position: {
        x: node.position.x * 2, // Double horizontal spacing
        y: node.position.y * 1.8, // Increase vertical spacing
      }
    }));
  }, [nodes]);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(expandedNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when props change
  useEffect(() => {
    setFlowNodes(expandedNodes);
    setFlowEdges(edges);
  }, [expandedNodes, edges, setFlowNodes, setFlowEdges]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-12 w-full !max-w-full h-full bg-transparent outline-none border-none ">
        <div className="flex-1 relative flowchart-modal max-h-[95vh]">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl"
            proOptions={{ hideAttribution: true }}
          >
            <Background
              gap={20}
              size={1}
              color="#e2e8f0"
            />
            <Controls
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
              showZoom={true}
              showFitView={true}
              showInteractive={false}
            />
            {miniMapVisible && (
              <MiniMap
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'input': return '#16a34a';
                    case 'output': return '#a855f7';
                    default: return node.data?.label?.includes('?') ? '#f59e0b' : '#3b82f6';
                  }
                }}
                maskColor="rgba(0, 0, 0, 0.1)"
              />
            )}

            <Panel position="top-right" className="bg-transparent">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMiniMapVisible(!miniMapVisible)}
                  className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm"
                  title={miniMapVisible ? "Hide minimap" : "Show minimap"}
                >
                  {miniMapVisible ? "Hide Map" : "Show Map"}
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlowchartModal;