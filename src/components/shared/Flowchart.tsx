import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { FlowchartEdge, FlowchartNode } from "@/types/explanation";
import { Maximize2, Sparkles } from "lucide-react";
import { useState } from "react";
import "reactflow/dist/style.css";
import "./flowchart.css";
import FlowchartModal from "./FlowchartModal";

interface FlowchartPanelProps {
  nodes?: FlowchartNode[];
  edges?: FlowchartEdge[];
}

// Default fallback data
const defaultFlowchart = {
  nodes: [
    { id: "1", type: "input" as const, position: { x: 250, y: 0 }, data: { label: "Start: fibonacci(n)" } },
    { id: "2", type: "default" as const, position: { x: 250, y: 100 }, data: { label: "n <= 1?" } },
    { id: "3", type: "output" as const, position: { x: 100, y: 200 }, data: { label: "Return n" } },
    { id: "4", type: "default" as const, position: { x: 400, y: 200 }, data: { label: "Calculate fibonacci(n-1) + fibonacci(n-2)" } },
    { id: "5", type: "output" as const, position: { x: 400, y: 300 }, data: { label: "Return result" } }
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3", label: "Yes" },
    { id: "e2-4", source: "2", target: "4", label: "No" },
    { id: "e4-5", source: "4", target: "5" }
  ]
};

function FlowchartPanel({ nodes, edges }: FlowchartPanelProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <Card className="animate-slide-up overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interactive Flowchart
            </span>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullscreen(true)}
              className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
              title="Open in fullscreen"
            >
              <Maximize2 className="h-3 w-3" />
              Fullscreen
            </Button>
          </div>
        </div>
      </CardHeader>

      <FlowchartModal
        open={showFullscreen}
        onOpenChange={setShowFullscreen}
        nodes={nodes || defaultFlowchart.nodes}
        edges={edges || defaultFlowchart.edges}
      />
    </Card>
  );
}

export default FlowchartPanel;