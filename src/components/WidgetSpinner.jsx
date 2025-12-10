import { useRef, useEffect } from "react";
import Segment from "./Segment";
import Indicator from "./Indicator";
import useWidgetRotation from "../hooks/useWidgetRotation";

const WidgetSpinner = ({ widgets, onSegmentChange }) => {
  const { svgRef, rotation } = useWidgetRotation(widgets, onSegmentChange);
  const containerRef = useRef(null);

  const viewportSize = Math.min(window.innerWidth, window.innerHeight);
  const outerRadius = viewportSize * 0.4;
  const innerRadius = viewportSize * 0.25;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * 0.05;
      rotation.targetIndicator += delta;
      rotation.targetSpinner -= delta;
    };

    const handleResize = () => {
      if (svgRef.current) svgRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [rotation, svgRef]);

  return (
    <div className="widgets" ref={containerRef}>
      <svg id="widget-svg" ref={svgRef} width="100%" height="100%">
        <defs />
        {widgets.map((widget, i) => (
          <Segment
            key={i}
            widget={widget}
            index={i}
            total={widgets.length}
            centerX={centerX}
            centerY={centerY}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        ))}
        <Indicator
          centerX={centerX}
          centerY={centerY}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          rotation={rotation.currentIndicator}
        />
        <g
          transform={`rotate(${rotation.currentSpinner} ${centerX} ${centerY})`}
        />
      </svg>
    </div>
  );
};

export default WidgetSpinner;
