'use client';

import { useEffect, useRef } from 'react';

export default function HeroAccent() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const media = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let disposed = false;
    let loading = false;
    let visible = false;
    let destroy: (() => void) | undefined;
    let updateLoop: (() => void) | undefined;

    // Mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.4;
    let targetRotY = 0.2;
    let currentRotX = 0.4;
    let currentRotY = 0.2;

    const onPointerMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      mouseY = (e.clientY - centerY) / (window.innerHeight / 2);
      targetRotX = 0.4 + mouseY * 0.45;
      targetRotY = 0.2 + mouseX * 0.45;
    };

    const load = async () => {
      if (disposed || loading || !media.matches || !visible) return;
      loading = true;

      try {
        const THREE = await import('three');
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(180, 180);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
        camera.position.z = 4.8;

        const geometry = new THREE.TorusKnotGeometry(0.78, 0.19, 128, 16, 2, 3);
        const material = new THREE.MeshStandardMaterial({
          color: '#c9a65d',
          metalness: 0.85,
          roughness: 0.25,
        });

        const sculpture = new THREE.Mesh(geometry, material);
        sculpture.rotation.set(currentRotX, currentRotY, 0);

        const ambientLight = new THREE.AmbientLight('#fff3d8', 2.8);
        const keyLight = new THREE.DirectionalLight('#fff8e5', 5.5);
        keyLight.position.set(3, 4, 5);

        const fillLight = new THREE.DirectionalLight('#ad8944', 3.2);
        fillLight.position.set(-3, -2, 2);

        const rimLight = new THREE.DirectionalLight('#e6cc80', 2.0);
        rimLight.position.set(0, -4, -2);

        scene.add(sculpture, ambientLight, keyLight, fillLight, rimLight);
        host.appendChild(renderer.domElement);
        host.dataset.loaded = 'true';

        let lastTime = 0;
        let baseRotation = 0;

        const render = (time: number) => {
          if (time - lastTime < 1000 / 60) return;
          const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
          lastTime = time;

          baseRotation += delta * 0.22;

          // Spring interpolation towards mouse parallax
          currentRotX += (targetRotX - currentRotX) * 0.08;
          currentRotY += (targetRotY - currentRotY) * 0.08;

          sculpture.rotation.x = currentRotX + Math.sin(time * 0.001) * 0.05;
          sculpture.rotation.y = currentRotY + baseRotation;
          sculpture.rotation.z = Math.cos(time * 0.0008) * 0.08;

          renderer.render(scene, camera);
        };

        updateLoop = () => {
          const active = visible && media.matches && !document.hidden;
          host.style.visibility = media.matches ? 'visible' : 'hidden';
          lastTime = 0;
          renderer.setAnimationLoop(active ? render : null);
        };

        const contextLost = (event: Event) => {
          event.preventDefault();
          renderer.setAnimationLoop(null);
          host.dataset.loaded = 'false';
        };

        const contextRestored = () => {
          host.dataset.loaded = 'true';
          updateLoop?.();
        };

        renderer.domElement.addEventListener('webglcontextlost', contextLost);
        renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
        window.addEventListener('mousemove', onPointerMove, { passive: true });

        destroy = () => {
          renderer.setAnimationLoop(null);
          renderer.domElement.removeEventListener('webglcontextlost', contextLost);
          renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
          window.removeEventListener('mousemove', onPointerMove);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          delete host.dataset.loaded;
        };

        updateLoop();
      } catch {
        host.dataset.loaded = 'false';
      }
    };

    const update = () => {
      if (!loading) void load();
      updateLoop?.();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });

    observer.observe(host);
    document.addEventListener('visibilitychange', update);
    media.addEventListener('change', update);

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      media.removeEventListener('change', update);
      destroy?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-10 -right-6 hidden size-[180px] items-center justify-center lg:flex [&[data-loaded=true]>svg]:hidden"
    >
      <svg viewBox="0 0 180 180" className="absolute size-full text-primary" fill="none">
        <ellipse
          cx="90"
          cy="90"
          rx="52"
          ry="28"
          stroke="currentColor"
          strokeWidth="8"
          transform="rotate(-40 90 90)"
        />
        <ellipse
          cx="90"
          cy="90"
          rx="52"
          ry="28"
          stroke="currentColor"
          strokeWidth="4"
          transform="rotate(40 90 90)"
        />
      </svg>
    </div>
  );
}
