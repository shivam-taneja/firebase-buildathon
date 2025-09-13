import { memo } from 'react';
import { getBezierPath, EdgeLabelRenderer } from 'reactflow';
import type { EdgeProps } from 'reactflow';

export const CustomEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},

  label,
  labelStyle = {},
  labelShowBg = true,
  labelBgStyle = {},
  labelBgPadding = [8, 4],
  labelBgBorderRadius = 2,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{
          stroke: '#6366f1',
          strokeWidth: 2,
          fill: 'none',
          ...style,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd="url(#react-flow__arrowclosed)"
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              fontWeight: 500,
              pointerEvents: 'all',
              ...labelStyle,
            }}
            className="nodrag nopan"
          >
            {labelShowBg && (
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: labelBgBorderRadius,
                  color: '#6366f1',
                  padding: `${labelBgPadding[1]}px ${labelBgPadding[0]}px`,
                  ...labelBgStyle,
                }}
              />
            )}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: labelShowBg ? '#ffffff' : 'transparent',
                border: labelShowBg ? '1px solid #6366f1' : 'none',
                borderRadius: labelBgBorderRadius,
                color: '#6366f1',
                padding: `${labelBgPadding[1]}px ${labelBgPadding[0]}px`,
                fontWeight: 600,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

export const edgeTypes = {
  default: CustomEdge,
};