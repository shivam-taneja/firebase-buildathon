export interface CodeExplanation {
  lineNumber: number;
  code: string;
  explanation: string;
  type: 'function-declaration' | 'variable-declaration' | 'loop' | 'condition' | 'operation' | 'block-end' | 'return' | 'import' | 'export' | 'comment' | 'other';
}

export type CodeExplanationArray = CodeExplanation[];