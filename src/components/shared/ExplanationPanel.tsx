import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CodeExplanationArray } from "@/types/explanation";

// Mock explanation data
const mockExplanations = [
  {
    lineNumber: 1,
    code: "function processArray(items) {",
    explanation: "Declares a function named 'processArray' that accepts an array parameter called 'items'",
    type: "function-declaration"
  },
  {
    lineNumber: 2,
    code: "  let result = [];",
    explanation: "Creates an empty array called 'result' to store processed values",
    type: "variable-declaration"
  },
  {
    lineNumber: 3,
    code: "  for (let i = 0; i < items.length; i++) {",
    explanation: "Starts a for loop that iterates through each item in the array using index 'i'",
    type: "loop"
  },
  {
    lineNumber: 4,
    code: "    if (items[i] > 0) {",
    explanation: "Checks if the current item is greater than zero (positive number)",
    type: "condition"
  },
  {
    lineNumber: 5,
    code: "      result.push(items[i] * 2);",
    explanation: "If positive, multiplies the item by 2 and adds it to the result array",
    type: "operation"
  },
  {
    lineNumber: 6,
    code: "    }",
    explanation: "Closes the if statement block",
    type: "block-end"
  },
  {
    lineNumber: 7,
    code: "  }",
    explanation: "Closes the for loop block",
    type: "block-end"
  },
  {
    lineNumber: 8,
    code: "  return result;",
    explanation: "Returns the processed result array containing doubled positive values",
    type: "return"
  },
  {
    lineNumber: 9,
    code: "}",
    explanation: "Closes the function definition",
    type: "block-end"
  },
];

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
}

function ExplanationPanel({ explanations }: ExplanationPanelProps) {
  if (!explanations)
    return null;

  return (
    <Card className="h-full animate-slide-up" style={{ animationDelay: "150ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          Line-by-Line Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
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
      </CardContent>
    </Card>
  );
}

export default ExplanationPanel;