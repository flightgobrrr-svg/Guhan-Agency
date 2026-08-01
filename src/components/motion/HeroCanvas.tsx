"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Metallic torus-knot hero scene with cursor-parallax and gold particle dust. */
export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 760;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.34, "#F3D794");
    g.addColorStop(0.55, "#96601C");
    g.addColorStop(0.72, "#16161A");
    g.addColorStop(1, "#050505");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 512);
    const env = new THREE.CanvasTexture(c);
    env.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = env;

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.32, 0.42, mobile ? 180 : 340, mobile ? 24 : 40, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.14, envMapIntensity: 1.5 })
    );
    const group = new THREE.Group();
    group.add(knot);
    scene.add(group);

    const key = new THREE.DirectionalLight(0xffe6b8, 2.4);
    key.position.set(3, 4, 5);
    const rim = new THREE.DirectionalLight(0xe0a63c, 3.0);
    rim.position.set(-5, -2, -3);
    scene.add(key, rim, new THREE.AmbientLight(0x404048, 1.2));

    const count = mobile ? 220 : 700;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 4.2;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(p) * 0.5;
    }
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pos, 3)),
      new THREE.PointsMaterial({ color: 0xf3d794, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false })
    );
    scene.add(dust);

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);

    function resize() {
      const w = host!.clientWidth || 1;
      const h = host!.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let raf = 0;
    let disposed = false;
    const t0 = performance.now();
    (function loop(now: number) {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const t = (now - t0) / 1000;
      cur.x += (target.x - cur.x) * 0.045;
      cur.y += (target.y - cur.y) * 0.045;
      if (!reduce) {
        knot.rotation.y = t * 0.28;
        knot.rotation.x = Math.sin(t * 0.4) * 0.22;
        group.position.y = Math.sin(t * 0.7) * 0.16;
        dust.rotation.y = t * 0.05;
      }
      group.rotation.y = cur.x * 0.42;
      group.rotation.x = cur.y * 0.3;
      camera.position.x = cur.x * 0.5;
      camera.position.y = -cur.y * 0.35;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    })(t0);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      renderer.dispose();
      knot.geometry.dispose();
      (knot.material as THREE.Material).dispose();
      dust.geometry.dispose();
      (dust.material as THREE.Material).dispose();
      env.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} style={{ position: "absolute", inset: 0, animation: "ghFloat 9s cubic-bezier(.4,0,.2,1) infinite" }} />;
}
