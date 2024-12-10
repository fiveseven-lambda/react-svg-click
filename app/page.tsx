"use client";

import React, { useRef, useState } from "react";

export default function Home() {
  const [p, setP] = useState([100, 100]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const setCoordinates = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    if (svgRef.current !== null) {
      const boundingRect = svgRef.current.getBoundingClientRect();
      const newX = clientX - boundingRect.x;
      const newY = clientY - boundingRect.y;
      setP([newX, newY]);
    }
  };
  const handleMouse = (event: React.MouseEvent) => setCoordinates(event);
  const handleTouch = (event: React.TouchEvent) => setCoordinates(event.changedTouches[0]);

  return <main className="container mx-auto">
    <p>({p[0]}, {p[1]})</p>
    <svg ref={svgRef} width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r="100" 
        fill={isMouseOver ? "silver" : "white"}
        stroke="black"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onMouseDown={event => {
          setIsMouseDown(true);
          handleMouse(event);
        }}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseMove={event => {
          if (isMouseDown) handleMouse(event);
        }}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      />
      <circle cx={p[0]} cy={p[1]} r={10} fill="red" className="pointer-events-none"/>
    </svg>
  </main>;
}
