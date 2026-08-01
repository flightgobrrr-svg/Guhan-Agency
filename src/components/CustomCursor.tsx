"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR = 'a,button,input,textarea,select,[role="button"],[data-hover]';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let over = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      const hit = e.target instanceof Element && e.target.closest(HOVER_SELECTOR);
      if (!!hit !== over) {
        over = !!hit;
        const s = over ? 62 : 34;
        ring.style.width = ring.style.height = `${s}px`;
        ring.style.marginLeft = ring.style.marginTop = `${-s / 2}px`;
        ring.style.background = over ? "rgba(224,166,60,.10)" : "transparent";
        ring.style.borderColor = over ? "rgba(243,215,148,.9)" : "rgba(224,166,60,.55)";
        dot.style.transform = over ? "scale(0)" : "scale(1)";
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        ring.style.opacity = "0";
        dot.style.opacity = "0";
      }
    };
    const onDown = () => {
      ring.style.transform += " scale(.86)";
    };

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseout", onOut);
    addEventListener("mousedown", onDown);

    (function loop() {
      raf = requestAnimationFrame(loop);
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      dot.style.transform = `translate3d(${tx}px,${ty}px,0)${over ? " scale(0)" : " scale(1)"}`;
    })();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onOut);
      removeEventListener("mousedown", onDown);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "34px",
          height: "34px",
          marginLeft: "-17px",
          marginTop: "-17px",
          borderRadius: "999px",
          border: "1px solid rgba(224,166,60,.55)",
          pointerEvents: "none",
          zIndex: 2147483000,
          transition:
            "width .32s cubic-bezier(.16,1,.3,1), height .32s cubic-bezier(.16,1,.3,1), margin .32s cubic-bezier(.16,1,.3,1), background .32s ease, border-color .32s ease, opacity .25s ease",
          opacity: 0,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          borderRadius: "999px",
          background: "#EFC46A",
          boxShadow: "0 0 12px rgba(224,166,60,.9)",
          pointerEvents: "none",
          zIndex: 2147483001,
          opacity: 0,
          transition: "opacity .25s ease, transform .3s cubic-bezier(.16,1,.3,1)",
          willChange: "transform",
        }}
      />
    </>
  );
}
