import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn(
      "relative rounded-lg border bg-code-bg overflow-hidden",
      "shadow-lg border-code-selection code-editor-container",
      className
    )}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        className="min-h-[400px]"
        value={value}
        onChange={handleChange}
        theme="vs-dark"
        loading={
          <div className="flex items-center justify-center min-h-[400px] w-full bg-[#1e1e1e]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-400 animate-pulse">Loading editor...</p>
            </div>
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

export default CodeEditor;