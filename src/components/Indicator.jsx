const Indicator = ({
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  rotation,
}) => {
  return (
    <line
      id="widget-indicator"
      x1={centerX}
      y1={centerY - innerRadius * 0.15}
      x2={centerX}
      y2={centerY - outerRadius * 1.05}
      transform={`rotate(${rotation} ${centerX} ${centerY})`}
      stroke="#f20000"
      strokeWidth="25"
      strokeLinecap="round"
    />
  );
};

export default Indicator;
