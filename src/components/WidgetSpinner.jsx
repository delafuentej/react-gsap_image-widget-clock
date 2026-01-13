import { useRef, useEffect, useState } from "react";
import Segment from "./Segment";
import Indicator from "./Indicator";
import useWidgetRotation from "../hooks/useWidgetRotation";

const WidgetSpinner = ({ widgets, onSegmentChange }) => {
  const { svgRef, rotation } = useWidgetRotation(widgets, onSegmentChange);
  const containerRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    viewportSize: Math.min(window.innerWidth, window.innerHeight),
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
  });

  const outerRadius = dimensions.viewportSize * 0.4;
  const innerRadius = dimensions.viewportSize * 0.25;
  const centerX = dimensions.centerX;
  const centerY = dimensions.centerY;

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * 0.05;
      // Sentido horario con la rueda del mouse
      rotation.targetIndicator += delta;
      rotation.targetSpinner -= delta;
    };

    const handleResize = () => {
      setDimensions({
        viewportSize: Math.min(window.innerWidth, window.innerHeight),
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2,
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [rotation]);

  return (
    <div className="widgets" ref={containerRef}>
      <svg
        id="widget-svg"
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.5,
          filter: "saturate(0)",
        }}
      >
        <defs />
        <g
          transform={`rotate(${rotation.currentSpinner} ${centerX} ${centerY})`}
        >
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
        </g>
        <Indicator
          centerX={centerX}
          centerY={centerY}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          rotation={rotation.currentIndicator}
        />
      </svg>
    </div>
  );
};
export default WidgetSpinner;
