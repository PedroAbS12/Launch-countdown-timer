import topDecor from "../assets/images/bg-stars.svg";
import bottomDecor from "../assets/images/pattern-hills.svg";

export default function DefaultLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-[#1f1d2a] text-white overflow-hidden">
      <img src={topDecor} className="absolute top-0 left-0" />
      {/* 
        width/height en % + object-fit:fill fuerza al img a estirarse
        horizontalmente sin respetar el aspect-ratio original del SVG.
        display:block elimina el espacio inline extra debajo de la imagen.
      */}
      <img
        src={bottomDecor}
        className="absolute bottom-0 left-0 opacity-40"
        style={{
          width: "100%",
          height: "197px",
          objectFit: "fill",
          display: "block",
        }}
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
