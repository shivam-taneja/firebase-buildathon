import Editor from '@monaco-editor/react';

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