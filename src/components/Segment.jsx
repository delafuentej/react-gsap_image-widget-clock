const Segment = ({
  widget,
  index,
  total,
  centerX,
  centerY,
  innerRadius,
  outerRadius,
}) => {
  const anglePerSegment = (2 * Math.PI) / total;
  const startAngle = index * anglePerSegment - Math.PI / 2;
  const endAngle = (index + 1) * anglePerSegment - Math.PI / 2;
  const midAngle = (startAngle + endAngle) / 2;

  const clipPathId = `clip-${index}`;
  const segmentRadius = (innerRadius + outerRadius) / 2;
  const segmentX = centerX + Math.cos(midAngle) * segmentRadius;
  const segmentY = centerY + Math.sin(midAngle) * segmentRadius;

  const arcLength = outerRadius * anglePerSegment;
  const imgWidth = arcLength * 1.25;
  const imgHeight = (outerRadius - innerRadius) * 1.25;
  const rotationDeg = (midAngle * 180) / Math.PI + 90;

  const path = `
      M ${centerX + outerRadius * Math.cos(startAngle)} ${
    centerY + outerRadius * Math.sin(startAngle)
  }
      A ${outerRadius} ${outerRadius} 0 0 1 ${
    centerX + outerRadius * Math.cos(endAngle)
  } ${centerY + outerRadius * Math.sin(endAngle)}
      L ${centerX + innerRadius * Math.cos(endAngle)} ${
    centerY + innerRadius * Math.sin(endAngle)
  }
      A ${innerRadius} ${innerRadius} 0 0 0 ${
    centerX + innerRadius * Math.cos(startAngle)
  } ${centerY + innerRadius * Math.sin(startAngle)}
      Z
    `;

  return (
    <>
      <clipPath id={clipPathId}>
        <path d={path} />
      </clipPath>
      <g clipPath={`url(#${clipPathId})`} data-segment={index}>
        <image
          href={widget.src}
          width={imgWidth}
          height={imgHeight}
          x={segmentX - imgWidth / 2}
          y={segmentY - imgHeight / 2}
          preserveAspectRatio="xMidYMid slice"
          transform={`rotate(${rotationDeg} ${segmentX} ${segmentY})`}
        />
      </g>
    </>
  );
};
export default Segment;
