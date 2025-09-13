import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';

import ApiKeyModal from '@/components/shared/ApiKeyModal';
import CodeEditor from '@/components/shared/CodeEditor';
import ExplanationPanel from '@/components/shared/ExplanationPanel';
import FlowchartPanel from '@/components/shared/Flowchart';
import LoadingState from '@/components/shared/LoadingState';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

import { useGeminiStore } from '@/store/site';
import type { CodeAnalysisResult } from '@/types/explanation';

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}
`;

const Generate = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResult | null>(null);
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

      const prompt = `Analyze the following code and provide a comprehensive analysis. Return a JSON object with this exact structure:

      {
        "summary": "A brief 2-3 sentence summary explaining what this code does, its purpose, and key functionality",
        "explanations": [
          {
            "lineNumber": number (starting from 1),
            "code": "exact code on that line",
            "explanation": "simple, short explanation",
            "type": "function-declaration | variable-declaration | loop | condition | operation | block-end | return | import | export | comment | other"
          }
        ],
        "flowchart": {
          "nodes": [
            {
              "id": "unique_string_id",
              "type": "input | output | default",
              "position": {"x": number, "y": number},
              "data": {"label": "descriptive label"}
            }
          ],
          "edges": [
            {
              "id": "unique_edge_id",
              "source": "source_node_id",
              "target": "target_node_id",
              "label": "optional_condition_label"
            }
          ]
        }
      }

      IMPORTANT FLOWCHART GUIDELINES:
      - Use "input" type for start nodes, "output" type for end/return nodes, "default" for decision/process nodes
      - Position nodes with adequate spacing (100-150px between levels, 200-300px horizontally)
      - Start with y=0 for the first node, increment by 100-150 for each level
      - For decision nodes, use clear Yes/No or True/False labels on edges
      - Create a logical flow that represents the code execution path
      - Include all major decision points, loops, and function calls
      - Keep labels concise but descriptive

      Code to analyze:
      ${code}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Parse the JSON response
      const parsedResult: CodeAnalysisResult = JSON.parse(text);
      setAnalysisResult(parsedResult);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col sticky animate-slide-up top-36">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              Original Code
            </h2>
            <Card className="p-0 flex-1 h-full">
              <CodeEditor
                value={code}
                onChange={setCode}
                className="border-0 h-full"
              />
            </Card>
          </div>

          <div className="flex flex-col ">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Analysis Results
            </h2>
            <div className="space-y-4 pr-4">
              <FlowchartPanel
                nodes={analysisResult?.flowchart.nodes}
                edges={analysisResult?.flowchart.edges}
              />
              <ExplanationPanel
                explanations={analysisResult?.explanations}
                summary={analysisResult?.summary}
              />
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
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

          <div className="container mx-auto px-6 py-16 relative z-10">
            <div className="max-w-6xl mx-auto space-y-16 animate-fade-in" id='generate'>
              {/* Hero Section */}
              <div className="text-center space-y-8 mb-20">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Code Analysis
                </div>

                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                  Skip the stress,
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    decode the mess
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                  DecodeMyCode bridges the gap between complex code and clear understanding.
                  Generate plain-English explanations and customizable flowcharts that make
                  <span className="font-semibold text-blue-600"> any code instantly comprehensible</span>.
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-8">
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Students & Learners
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Educators & Creators
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Development Teams
                  </div>
                </div>
              </div>

              {/* Code Editor Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      Paste Your Code
                    </h3>
                    <p className="text-gray-600">Any language, any complexity - we'll break it down for you</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCode(sampleCode)}
                    className="text-sm hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Try Sample
                  </Button>
                </div>

                <div className="relative">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    className="animate-slide-up shadow-lg border-0 rounded-2xl overflow-hidden"
                  />
                  {!code.trim() && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm rounded-2xl">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Start by pasting your code here</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={() => handleGenerate()}
                    disabled={!code.trim() || isLoading}
                    size="lg"
                    className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ animationDelay: "200ms" }}
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Generate Analysis
                    <div className="ml-3 flex items-center">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-100 ml-1"></div>
                      <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse delay-200 ml-1"></div>
                    </div>
                  </Button>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Line-by-Line</h4>
                    <p className="text-sm text-gray-600">Plain English explanations for every line</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Visual Flowchart</h4>
                    <p className="text-sm text-gray-600">Interactive diagrams of code logic</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Smart Summary</h4>
                    <p className="text-sm text-gray-600">Overall purpose and key insights</p>
                  </div>
                </div>
              </div>
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
