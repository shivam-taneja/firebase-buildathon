import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import type { FlowchartNode, FlowchartEdge } from "@/types/explanation";

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
  return (
    <Card className="animate-slide-up h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          Interactive Flowchart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div className="relative h-full bg-muted/30 overflow-hidden">
          <ReactFlow
            nodes={nodes || defaultFlowchart.nodes}
            edges={edges || defaultFlowchart.edges}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background />
            {/* <Controls /> */}
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
}

export default FlowchartPanel;