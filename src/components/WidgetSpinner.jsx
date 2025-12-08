import { useEffect } from "react";
import useWidgetRotation from "../hooks/useWidgetRotation";
import gsap from "gsap";

const createSVG = (type, attrs = {}) => {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    type
  );
  Object.entries(attrs).forEach(([k, v]) => svgElement.setAttribute(k, v));
  return svgElement;
};

const WidgetSpinner = ({ widgets, onSegmentChange }) => {
  const { svgRef, rotation } = useWidgetRotation(widgets, onSegmentChange);

  useEffect(() => {
    if (!svgRef.current) {
      const container = document.querySelector(".widgets");
      const viewportSize = Math.min(window.innerWidth, window.innerHeight);
      const outerRadius = viewportSize * 0.4;
      const innerRadius = viewportSize * 0.25;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const svg = createSVG("svg", { id: "widget-svg" });
      svgRef.current = svg;

      const defs = createSVG("defs");
      svg.appendChild(defs);

      const anglePerSegment = (2 * Math.PI) / widgets.length;

      for (let i = 0; i < widgets.length; i++) {
        const startAngle = i * anglePerSegment - Math.PI / 2;
        const endAngle = (i + 1) * anglePerSegment - Math.PI / 2;
        const midAngle = (startAngle + endAngle) / 2;

        const clipPath = createSVG("clipPath", { id: `clip-${i}` });
        const path = `M ${centerX + outerRadius * Math.cos(startAngle)} ${
          centerY + outerRadius * Math.sin(startAngle)
        } A ${outerRadius} ${outerRadius} 0 0 1 ${
          centerX + outerRadius * Math.cos(endAngle)
        } ${centerY + outerRadius * Math.sin(endAngle)} L ${
          centerX + innerRadius * Math.cos(endAngle)
        } ${
          centerY + innerRadius * Math.sin(endAngle)
        } A ${innerRadius} ${innerRadius} 0 0 0 ${
          centerX + innerRadius * Math.cos(startAngle)
        } ${centerY + innerRadius * Math.sin(startAngle)} Z`;
        clipPath.appendChild(createSVG("path", { d: path }));
        defs.appendChild(clipPath);

        const g = createSVG("g", {
          "clip-path": `url(#clip-${i})`,
          "data-segment": i,
        });

        const segmentRadius = (innerRadius + outerRadius) / 2;
        const segmentX = centerX + Math.cos(midAngle) * segmentRadius;
        const segmentY = centerY + Math.sin(midAngle) * segmentRadius;

        const arcLength = outerRadius * anglePerSegment;
        const imgWidth = arcLength * 1.25;
        const imgHeight = (outerRadius - innerRadius) * 1.25;
        const rotationDeg = (midAngle * 180) / Math.PI + 90;

        const image = createSVG("image", {
          href: widgets[i].src,
          width: imgWidth,
          height: imgHeight,
          x: segmentX - imgWidth / 2,
          y: segmentY - imgHeight / 2,
          preserveAspectRatio: "xMidYMid slice",
          transform: `rotate(${rotationDeg} ${segmentX} ${segmentY})`,
        });

        g.appendChild(image);
        svg.appendChild(g);
      }

      // Indicador
      const indicator = createSVG("line", {
        id: "widget-indicator",
        x1: centerX,
        y1: centerY - innerRadius * 0.15,
        x2: centerX,
        y2: centerY - outerRadius * 1.05,
      });
      svg.appendChild(indicator);

      container.appendChild(svg);

      // Rueda interactiva con scroll
      window.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          const delta = e.deltaY * 0.05;
          rotation.targetIndicator += delta;
          rotation.targetSpinner -= delta;
        },
        { passive: false }
      );

      window.addEventListener("resize", () => {
        if (svg) svg.remove();
        svgRef.current = null;
      });
    }

    // Actualiza rotación del SVG
    const indicator = document.getElementById("widget-indicator");
    if (indicator) {
      indicator.setAttribute(
        "transform",
        `rotate(${rotation.currentIndicator} ${window.innerWidth / 2} ${
          window.innerHeight / 2
        })`
      );
    }

    if (svgRef.current) {
      svgRef.current.querySelectorAll("[data-segment]").forEach((seg) => {
        seg.setAttribute(
          "transform",
          `rotate(${rotation.currentSpinner} ${window.innerWidth / 2} ${
            window.innerHeight / 2
          })`
        );
      });
    }
  }, [rotation, svgRef, widgets]);

  return null; // todo se renderiza directamente en el DOM
};

export default WidgetSpinner;
