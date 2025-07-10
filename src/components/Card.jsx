import { useEffect, useRef } from "react";

function Card({ value, footer, animate }) {
  const flipRef = useRef(null);

  useEffect(() => {
    if (animate && flipRef.current) {
      flipRef.current.classList.remove("flip-animation");
      void flipRef.current.offsetWidth; // fuerza reinicio
      flipRef.current.classList.add("flip-animation");
    }
  }, [value, animate]);

  return (
    <div className="w-fit">
      <div className="relative w-32 h-32 [perspective:1000px] overflow-hidden rounded-lg bg-[#34364f]">
        {/* Hoja animada con color distinto para notar el giro */}
        <div
          ref={flipRef}
          className="absolute inset-0 bg-[#2c2c44] origin-center z-10  shadow-inner"
        ></div>

        {/* Número encima siempre visible */}
        <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-[#da6384] z-20 pointer-events-none">
          {value}
        </div>

        {/* Línea divisoria decorativa */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#29293f] z-30" />
      </div>

      <footer className="mt-4 text-center">
        <h3>{footer}</h3>
      </footer>
    </div>
  );
}

export default Card;
