"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [p, setP] = useState([100, 100]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState(false);
  return <main className="container mx-auto">
    <p>({p[0]}, {p[1]})</p>
    <svg ref={svgRef} width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r="100" 
        fill={hover ? "silver" : "white"}
        stroke="black"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={event => {
          if (svgRef.current !== null) {
            const boundingRect = svgRef.current.getBoundingClientRect();
            const newX = event.clientX - boundingRect.x;
            const newY = event.clientY - boundingRect.y;
            setP([newX, newY]);
          }
        }}
      />
      <circle cx={p[0]} cy={p[1]} r={10} fill="red" className="pointer-events-none"/>
    </svg>
  </main>;
}
