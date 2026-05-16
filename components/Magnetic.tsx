"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      // Calcular el centro del elemento
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calcular la distancia entre el cursor y el centro
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Mover el elemento un 35% de la distancia total (efecto magnético sutil)
      gsap.to(container, {
        x: distanceX * 0.35,
        y: distanceY * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Regresar al centro de forma elástica
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: containerRef });
}