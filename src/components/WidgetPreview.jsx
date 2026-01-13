// src/components/WidgetPreview.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const WidgetPreview = ({ activeWidget, midAngle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!activeWidget || !containerRef.current) return;

    const container = containerRef.current;

    // Crear la nueva imagen
    const img = document.createElement("img");
    img.src = activeWidget.src;
    img.alt = activeWidget.title;

    container.appendChild(img);

    // --- Calcular desplazamiento radial según el midAngle ---
    // midAngle en grados, convertimos a radianes
    const rad = (midAngle * Math.PI) / 180;
    const distance = 50; // px desde el centro, ajustable
    const fromX = Math.cos(rad) * distance;
    const fromY = Math.sin(rad) * distance;

    // --- Animación con GSAP ---
    gsap.fromTo(
      img,
      {
        opacity: 0,
        scale: 1.1,
        x: fromX,
        y: fromY,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Limitar máximo 3 imágenes en DOM
    const images = container.querySelectorAll("img");
    if (images.length > 3) {
      for (let i = 0; i < images.length - 3; i++) {
        gsap.to(images[i], {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => images[i].remove(),
        });
      }
    }
  }, [activeWidget, midAngle]);

  return <div className="widget-preview-img" ref={containerRef} />;
};

export default WidgetPreview;
