// src/components/FlipCard.jsx
import { useEffect, useRef, useState } from "react";

export default function FlipCard({
  front = "Frente",
  back = "Reverso",
  autoFlip = false,
  flipDelay = 2000,
}) {
  const [flipped, setFlipped] = useState(false);
  const flipRef = useRef(null);

  useEffect(() => {
    if (autoFlip) {
      const interval = setInterval(() => {
        setFlipped((prev) => !prev);
      }, flipDelay);
      return () => clearInterval(interval);
    }
  }, [autoFlip, flipDelay]);

  return (
    <div className="w-48 h-64 perspective">
      <div
        ref={flipRef}
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${flipped ? "rotate-y-180" : ""}`}
      >
        <div className="absolute w-full h-full backface-hidden bg-pink-400 flex items-center justify-center text-white text-xl rounded-lg">
          {front}
        </div>
        <div className="absolute w-full h-full backface-hidden bg-indigo-500 flex items-center justify-center text-white text-xl rotate-y-180 rounded-lg">
          {back}
        </div>
      </div>
    </div>
  );
}
