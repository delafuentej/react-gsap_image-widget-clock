const Segment = ({
  widget,
  index,
  total,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
}) => {
  const anglePerSegment = 360 / total;
  const startAngle = index * anglePerSegment - 90;
  const endAngle = startAngle + anglePerSegment;

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const x1 = centerX + innerRadius * Math.cos(toRadians(startAngle));
  const y1 = centerY + innerRadius * Math.sin(toRadians(startAngle));
  const x2 = centerX + outerRadius * Math.cos(toRadians(startAngle));
  const y2 = centerY + outerRadius * Math.sin(toRadians(startAngle));
  const x3 = centerX + outerRadius * Math.cos(toRadians(endAngle));
  const y3 = centerY + outerRadius * Math.sin(toRadians(endAngle));
  const x4 = centerX + innerRadius * Math.cos(toRadians(endAngle));
  const y4 = centerY + innerRadius * Math.sin(toRadians(endAngle));

  const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

  const pathData = `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
    Z
  `;

  const clipId = `clip-${index}`;
  // Calcular posición y tamaño de la imagen dentro del segmento
  const midAngle = startAngle + anglePerSegment / 2;
  const segmentRadius = (innerRadius + outerRadius) / 2;

  const imageX =
    centerX + Math.cos(toRadians(midAngle)) * segmentRadius - outerRadius / 2;
  const imageY =
    centerY + Math.sin(toRadians(midAngle)) * segmentRadius - outerRadius / 2;

  const imageSize = outerRadius; // ajusta tamaño según tu preferencia

  return (
    <g>
      {/* ClipPath para que la imagen solo se vea dentro del segmento */}
      <defs>
        <clipPath id={clipId}>
          <path d={pathData} />
        </clipPath>
      </defs>

      {/* Imagen del widget */}
      <image
        href={widget.src}
        x={imageX}
        y={imageY}
        width={imageSize}
        height={imageSize}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />

      {/* Contorno del segmento */}
      <path
        d={pathData}
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.3"
      />
    </g>
  );
};

export default Segment;
