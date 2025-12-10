const Indicator = ({
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  rotation,
}) => (
  <line
    id="widget-indicator"
    x1={centerX}
    y1={centerY - innerRadius * 0.15}
    x2={centerX}
    y2={centerY - outerRadius * 1.05}
    transform={`rotate(${rotation} ${centerX} ${centerY})`}
    //stroke="black"
    strokeWidth="2"
  />
);
export default Indicator;
