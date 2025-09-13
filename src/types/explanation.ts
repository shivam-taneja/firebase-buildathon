export interface CodeExplanation {
  lineNumber: number;
  code: string;
  explanation: string;
  type: 'function-declaration' | 'variable-declaration' | 'loop' | 'condition' | 'operation' | 'block-end' | 'return' | 'import' | 'export' | 'comment' | 'other';
}

export type CodeExplanationArray = CodeExplanation[];

export interface FlowchartNode {
  id: string;
  type: 'input' | 'output' | 'default';
  position: { x: number; y: number };
  data: { label: string };
}

export interface FlowchartEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface CodeAnalysisResult {
  summary: string;
  explanations: CodeExplanationArray;
  flowchart: {
    nodes: FlowchartNode[];
    edges: FlowchartEdge[];
  };
}