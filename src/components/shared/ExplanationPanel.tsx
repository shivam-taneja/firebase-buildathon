import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CodeExplanationArray } from "@/types/explanation";

const getTypeColor = (type: string) => {
  switch (type) {
    case "function-declaration":
      return "bg-primary/10 text-primary border-primary/20";
    case "variable-declaration":
      return "bg-success/10 text-success border-success/20";
    case "loop":
      return "bg-warning/10 text-warning border-warning/20";
    case "condition":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "operation":
      return "bg-accent text-accent-foreground border-accent";
    case "return":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted text-muted-foreground border-muted";
  }
};

interface ExplanationPanelProps {
  explanations?: CodeExplanationArray;
  summary?: string;
}

function ExplanationPanel({ explanations, summary }: ExplanationPanelProps) {
  if (!explanations)
    return null;

  return (
    <Card className="h-full animate-slide-up" style={{ animationDelay: "150ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          Code Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
        {summary && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        )}
        <div className="space-y-3">
          {explanations.map((item, index) => (
            <div
              key={item.lineNumber}
              className="group p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono flex items-center justify-center">
                  {item.lineNumber}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground flex-1">
                      {item.code}
                    </code>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getTypeColor(item.type)}`}
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ExplanationPanel;