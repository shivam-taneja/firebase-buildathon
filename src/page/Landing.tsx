import { useState } from 'react';

import CodeEditor from '@/components/shared/CodeEditor';
import ExplanationPanel from '@/components/shared/ExplanationPanel';
import FlowchartPanel from '@/components/shared/Flowchart';
import LoadingState from '@/components/shared/LoadingState';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
`;

const Generate = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim())
      return;

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              Original Code
            </h2>
            <Card className="p-0 overflow-hidden">
              <CodeEditor
                value={code}
                onChange={setCode}
                className="border-0 h-screen"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Analysis Results
            </h2>
            <div className="grid grid-rows-2 gap-4 h-[calc(100%-3rem)]">
              <FlowchartPanel />
              <ExplanationPanel />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id='generate'>
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-foreground">
                Transform Code into
                <span className="text-primary block">Visual Understanding</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Paste your code below and get instant flowcharts and line-by-line explanations
                to understand complex logic at a glance.
              </p>
            </div>

            {/* Code Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Your Code</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(sampleCode)}
                  className="text-sm hover:bg-accent"
                >
                  Try Sample
                </Button>
              </div>

              <CodeEditor
                value={code}
                onChange={setCode}
                className="animate-slide-up"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGenerate}
                disabled={!code.trim() || isLoading}
                size="lg"
                className="px-8 py-6 text-lg font-semibold hover:bg-primary-hover transition-all duration-200  hover:scale-105 ease-in-out"
                //  className="hover:scale-105 transition-all duration-300 ease-in-out"
                style={{ animationDelay: "200ms" }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Generate Analysis
              </Button>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Generate