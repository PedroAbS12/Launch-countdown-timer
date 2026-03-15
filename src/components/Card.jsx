import { useEffect, useRef, useState } from "react";
import "./Card.css";

function Card({ value, nextValue, footer, trigger }) {
  const topFlipRef = useRef(null);
  const bottomFlipRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [nextDisplayValue, setNextDisplayValue] = useState(value);

  useEffect(() => {
    if (value === nextValue) return;

    // NO actualizamos nextDisplayValue todavía — la parte inferior
    // debe seguir mostrando el valor viejo hasta que la hoja superior caiga

    const top = topFlipRef.current;
    const bottom = bottomFlipRef.current;
    if (!top || !bottom) return;

    // Reset sin transición
    top.style.transition = "none";
    top.style.transform = "rotateX(0deg)";
    bottom.style.transition = "none";
    bottom.style.transform = "rotateX(90deg)";

    // Force reflow
    void top.offsetWidth;

    // Fase 1: hoja superior cae (0deg → -90deg)
    requestAnimationFrame(() => {
      top.style.transition = "transform 0.25s ease-in";
      top.style.transform = "rotateX(-90deg)";

      setTimeout(() => {
        // Solo aquí, cuando la hoja superior ya cayó, revelamos el valor nuevo
        setNextDisplayValue(nextValue);
        setDisplayValue(nextValue);

        // Fase 2: hoja inferior sube (90deg → 0deg)
        bottom.style.transition = "transform 0.25s ease-out";
        bottom.style.transform = "rotateX(0deg)";
      }, 250);
    });
  }, [trigger]);

  return (
    <div className="card-wrapper">
      <div className="card">
        {/* Mitad superior estática */}
        <div className="card__half card__half--top">
          <div className="card__number-container">
            <span className="card__number">{displayValue}</span>
          </div>
        </div>

        {/* Mitad inferior estática */}
        <div className="card__half card__half--bottom">
          <div className="card__number-container">
            <span className="card__number">{nextDisplayValue}</span>
          </div>
        </div>

        {/* Hoja animada superior (cae) */}
        <div ref={topFlipRef} className="card__flap card__flap--top">
          <div className="card__number-container">
            <span className="card__number">{value}</span>
          </div>
        </div>

        {/* Hoja animada inferior (sube) */}
        <div ref={bottomFlipRef} className="card__flap card__flap--bottom">
          <div className="card__number-container">
            <span className="card__number">{nextDisplayValue}</span>
          </div>
        </div>

        <div className="card__divider" />
        <div className="card__shadow" />
      </div>

      <footer className="card-footer">
        <h3 className="card-footer__label">{footer}</h3>
      </footer>
    </div>
  );
}

export default Card;
