import { useEffect, useRef } from "react";
import gsap from "gsap";

const WidgetTitle = ({ currentWidget }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!currentWidget || !titleRef.current) return;

    const el = titleRef.current;

    // Animación: Fade + Scale + Motion blur + Glow
    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.8,
        y: -10, // ligera entrada desde arriba
        filter: "blur(4px) drop-shadow(0 0 0px #ffff2b)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px) drop-shadow(0 0 10px #ffff2b)",
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [currentWidget]);

  return (
    <div className="widget-title" ref={titleRef}>
      {currentWidget.title}
    </div>
  );
};

export default WidgetTitle;
