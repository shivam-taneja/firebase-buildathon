import type { CodeAnalysisResult } from '@/types/explanation';
import { type Dispatch, type SetStateAction } from 'react';
import { Card } from '../ui/card';
import CodeEditor from './CodeEditor';
import ExplanationPanel from './ExplanationPanel';
import FlowchartPanel from './Flowchart';

const ResultComponent = ({
  code,
  analysisResult,
  setCode
}: {
  code: string,
  analysisResult: CodeAnalysisResult | null,
  setCode: Dispatch<SetStateAction<string>>
}) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative ">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-8 relative z-10 pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Code Editor Section */}
          <div className="flex flex-col sticky animate-slide-up top-36">
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Original Code</h2>
                  <p className="text-sm text-gray-600">Your input for analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Editable
              </div>
            </div>
            <Card className="p-0 flex-1 h-full rounded-t-none border-t-0 shadow-2xl">
              <CodeEditor
                value={code}
                onChange={setCode}
                className="border-0 h-full rounded-t-none"
              />
            </Card>
          </div>

          <div className="flex flex-col">
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl border border-gray-200 p-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Analysis Results
                  </h2>
                  <p className="text-sm text-gray-600">AI-generated insights and visualizations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pr-4 overflow-y-auto">
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <FlowchartPanel
                  nodes={analysisResult?.flowchart.nodes}
                  edges={analysisResult?.flowchart.edges}
                />
              </div>

              <div className="transform transition-all duration-300">
                <ExplanationPanel
                  explanations={analysisResult?.explanations}
                  summary={analysisResult?.summary}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultComponent