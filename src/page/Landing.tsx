import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import CodeEditor from '@/components/shared/CodeEditor';
import ExplanationPanel from '@/components/shared/ExplanationPanel';
import FlowchartPanel from '@/components/shared/Flowchart';
import LoadingState from '@/components/shared/LoadingState';
import ApiKeyModal from '@/components/shared/ApiKeyModal';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

import type { CodeExplanationArray } from '@/types/explanation';
import { useGeminiStore } from '@/store/site';

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
`;

const Generate = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [explanations, setExplanations] = useState<CodeExplanationArray>([]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { apiKey, setApiKey } = useGeminiStore()

  const handleGenerate = async (overrideApiKey?: string) => {
    if (!code.trim())
      return;

    const keyToUse = overrideApiKey ?? apiKey;

    if (!keyToUse) {
      setShowApiKeyModal(true);
      return;
    }

    setIsLoading(true);

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(keyToUse);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        generationConfig: {
          temperature: 0.1,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      });

      const prompt = `Analyze the following code and provide a line-by-line explanation. Return a JSON array where each object has:
- lineNumber: number (starting from 1)
- code: string (exact code on that line)
- explanation: string (simple, short explanation)
- type: string (function-declaration, variable-declaration, loop, condition, operation, block-end, return, import, export, comment, or other)

Code to analyze:
${code}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      const parsedExplanations: CodeExplanationArray = JSON.parse(text);
      setExplanations(parsedExplanations);

    } catch (error) {
      console.error('Error generating explanation:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    setShowApiKeyModal(false);
    // Immediately call generate with the new key to avoid stale-closure issues
    handleGenerate(key);
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
              <ExplanationPanel explanations={explanations} />
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
                onClick={() => handleGenerate()}
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

      <ApiKeyModal
        open={showApiKeyModal}
        onOpenChange={setShowApiKeyModal}
        onSave={handleApiKeySave}
      />
    </>
  )
}

export default Generate
