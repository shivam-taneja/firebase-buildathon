import { useEffect, useRef, useState } from "react";

import { Check, Code, FileText, Layout, Loader2, Search } from "lucide-react";

const loadingMessages = [
  "Analyzing code structure...",
  "Identifying key components...",
  "Generating flowchart...",
  "Creating explanations...",
  "Preparing results...",
];

interface LoadingStateProps {
  className?: string;
}

export default function LoadingState({ className }: LoadingStateProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // How many rows are visible at once (controls container height)
  const VISIBLE_ROWS = 3;

  // Refs for measuring
  const stepRef = useRef<HTMLDivElement | null>(null);
  const innerListRef = useRef<HTMLDivElement | null>(null);

  const [stepHeight, setStepHeight] = useState<number>(56); // sensible default

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function measure() {
      if (stepRef.current) {
        const rect = stepRef.current.getBoundingClientRect();
        setStepHeight(Math.round(rect.height));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);


  const translateY = -currentMessageIndex * stepHeight;

  const stepIcons = [
    <Code className="h-5 w-5" aria-hidden />,
    <Search className="h-5 w-5" aria-hidden />,
    <Layout className="h-5 w-5" aria-hidden />,
    <FileText className="h-5 w-5" aria-hidden />,
    <Check className="h-5 w-5" aria-hidden />,
  ];

  return (
    <main className="w-full flex justify-center items-center h-screen">
      <div
        className={`flex flex-col items-center justify-center overflow-hidden ${className}`}
      >
        <div
          className="w-full max-w-md "
          style={{ height: `${stepHeight * VISIBLE_ROWS}px` }}
        >
          <div
            ref={innerListRef}
            className="transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            {loadingMessages.map((msg, i) => {
              const isActive = i === currentMessageIndex;
              const isDone = i < currentMessageIndex;

              return (
                <div
                  key={i}
                  ref={i === 0 ? stepRef : undefined}
                  className="flex items-center gap-4 px-3 py-3"
                  style={{ minHeight: 56 }}
                >
                  <div
                    className={`flex items-center justify-center rounded-full shrink-0
                    ${isDone ? "h-9 w-9 bg-primary/90 text-white" : "h-9 w-9 bg-slate-100 dark:bg-slate-800 text-muted-foreground"}
                  `}
                    aria-hidden
                  >
                    {isDone ? (
                      <Check className="h-5 w-5" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      stepIcons[i] ?? <div className="h-5 w-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`text-sm transition-colors duration-200 ${isDone ? "text-muted-foreground line-through" : isActive ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {msg}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {isDone ? "Completed" : isActive ? "In progress" : "Waiting"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
