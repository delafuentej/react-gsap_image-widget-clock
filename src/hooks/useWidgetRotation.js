import { useEffect, useRef, useState } from "react";

export default function useWidgetRotation(widgets = [], onSegmentChange) {
  const svgRef = useRef(null);
  const lastSegmentRef = useRef(-1);
  const lastTimeRef = useRef(performance.now());
  const [rotation, setRotation] = useState({
    currentIndicator: 0,
    targetIndicator: 0,
    currentSpinner: 0,
    targetSpinner: 0,
  });
  const [activeSegment, setActiveSegment] = useState(0);

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    if (!svgRef.current || !widgets || widgets.length === 0) return;

    const animate = () => {
      const currentTime = performance.now();
      let deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;
      deltaTime = Math.min(deltaTime, 0.1);

      setRotation((prev) => {
        const newTargetIndicator = prev.targetIndicator + 18 * deltaTime;
        const newTargetSpinner = prev.targetSpinner - 18 * 0.25 * deltaTime;

        const currentIndicator = lerp(
          prev.currentIndicator,
          newTargetIndicator,
          0.1
        );
        const currentSpinner = lerp(prev.currentSpinner, newTargetSpinner, 0.1);

        const relativeRotation =
          (((currentIndicator - currentSpinner) % 360) + 360) % 360;
        const segmentIndex =
          widgets.length > 0
            ? Math.floor(relativeRotation / (360 / widgets.length)) %
              widgets.length
            : 0;

        if (segmentIndex !== lastSegmentRef.current) {
          lastSegmentRef.current = segmentIndex;
          setActiveSegment(segmentIndex);
        }

        return {
          currentIndicator,
          targetIndicator: newTargetIndicator,
          currentSpinner,
          targetSpinner: newTargetSpinner,
        };
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [widgets]);

  useEffect(() => {
    if (onSegmentChange && widgets[activeSegment]) {
      onSegmentChange(widgets[activeSegment]);
    }
  }, [activeSegment, widgets, onSegmentChange]);

  return { svgRef, rotation };
}
