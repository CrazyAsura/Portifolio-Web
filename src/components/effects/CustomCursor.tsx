'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  baseSize: number;
  opacity: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  mesh: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const media = matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );

    if (!media.matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // ----------------------------------------------------
    // Three.js Scene Setup (1 unit = 1 pixel in screen space)
    // ----------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -100, 100);
    camera.position.z = 10;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
    } catch {
      return;
    }

    // ----------------------------------------------------
    // State Variables
    // ----------------------------------------------------
    let isDark = document.documentElement.classList.contains('dark');
    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringVx = 0;
    let ringVy = 0;

    let active = false;
    let isInteractive = false;
    let isPointerDown = false;
    let ringCurrentScale = 1;
    let ringTargetScale = 1;

    let lastMoveTime = performance.now();
    let prevMouseX = -100;
    let prevMouseY = -100;

    // Theme Color Palette
    const getColors = () => {
      isDark = document.documentElement.classList.contains('dark');
      return {
        dot: isDark ? new THREE.Color('#d6bb7c') : new THREE.Color('#80601e'),
        dotCore: isDark ? new THREE.Color('#f0eee6') : new THREE.Color('#24231f'),
        ring: isDark ? new THREE.Color('#d6bb7c') : new THREE.Color('#80601e'),
        ringGlow: isDark ? new THREE.Color('#f0eee6') : new THREE.Color('#24231f'),
        particle: isDark ? new THREE.Color('#d6bb7c') : new THREE.Color('#99762f'),
        ripple: isDark ? new THREE.Color('#d6bb7c') : new THREE.Color('#80601e'),
      };
    };

    let colors = getColors();

    // ----------------------------------------------------
    // Inner High-Precision Core Dot
    // ----------------------------------------------------
    const dotGeo = new THREE.CircleGeometry(4, 32);
    const dotMat = new THREE.MeshBasicMaterial({
      color: colors.dotCore,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.set(-100, -100, 3);
    scene.add(dotMesh);

    // ----------------------------------------------------
    // Outer Smooth Elastic Ring
    // ----------------------------------------------------
    const ringGeo = new THREE.RingGeometry(15, 17, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors.ring,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-100, -100, 2);
    scene.add(ringMesh);

    // Outer subtle orbit halo
    const haloGeo = new THREE.RingGeometry(18, 19, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: colors.ringGlow,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(-100, -100, 1);
    scene.add(haloMesh);

    // ----------------------------------------------------
    // Fluid Particle Trail System
    // ----------------------------------------------------
    const MAX_PARTICLES = 36;
    const particles: TrailParticle[] = [];

    // Create a circular sprite texture for particles
    const createParticleTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 32;
      pCanvas.height = 32;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleTexture = createParticleTexture();
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(MAX_PARTICLES * 3);
    const particleColors = new Float32Array(MAX_PARTICLES * 3);
    const particleSizes = new Float32Array(MAX_PARTICLES);

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 14,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    const spawnParticle = (x: number, y: number, speedX: number, speedY: number) => {
      if (particles.length >= MAX_PARTICLES) {
        particles.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 2 + 0.5;
      const size = Math.random() * 5 + 3;

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: speedX * 0.15 + Math.cos(angle) * spread,
        vy: speedY * 0.15 + Math.sin(angle) * spread,
        life: 1.0,
        maxLife: Math.random() * 0.35 + 0.3,
        size,
        baseSize: size,
        opacity: Math.random() * 0.5 + 0.4,
      });
    };

    // ----------------------------------------------------
    // Click Ripples / Shockwaves
    // ----------------------------------------------------
    const activeRipples: ClickRipple[] = [];

    const spawnRipple = (x: number, y: number) => {
      const rippleGeo = new THREE.RingGeometry(2, 4, 48);
      const rippleMat = new THREE.MeshBasicMaterial({
        color: colors.ripple,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
      rippleMesh.position.set(x, y, 0);
      scene.add(rippleMesh);

      activeRipples.push({
        x,
        y,
        radius: 4,
        maxRadius: isInteractive ? 54 : 42,
        opacity: 0.8,
        mesh: rippleMesh,
      });
    };

    // ----------------------------------------------------
    // Update Colors based on Theme Change
    // ----------------------------------------------------
    const updateColors = () => {
      colors = getColors();
      dotMat.color.copy(colors.dotCore);
      ringMat.color.copy(colors.ring);
      haloMat.color.copy(colors.ringGlow);
    };

    const themeObserver = new MutationObserver(updateColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // ----------------------------------------------------
    // Animation Loop (requestAnimationFrame)
    // ----------------------------------------------------
    let rafId = 0;
    let lastFrameTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;

      // 1. Interpolate Dot (Crisp & Snappy)
      dotX += (targetX - dotX) * 0.48;
      dotY += (targetY - dotY) * 0.48;
      dotMesh.position.set(dotX, dotY, 3);

      // Dot scaling
      const dotTargetScale = isPointerDown ? 0.7 : isInteractive ? 1.4 : 1.0;
      dotMesh.scale.lerp(
        new THREE.Vector3(dotTargetScale, dotTargetScale, 1),
        0.2,
      );

      // 2. Physics Spring for Outer Ring
      const springStiffness = 0.18;
      const damping = 0.76;
      ringVx = (ringVx + (targetX - ringX) * springStiffness) * damping;
      ringVy = (ringVy + (targetY - ringY) * springStiffness) * damping;
      ringX += ringVx;
      ringY += ringVy;

      ringMesh.position.set(ringX, ringY, 2);
      haloMesh.position.set(ringX, ringY, 1);

      // Dynamic Ring Scale & Deformation
      ringTargetScale = isPointerDown ? 0.85 : isInteractive ? 1.75 : 1.0;
      ringCurrentScale += (ringTargetScale - ringCurrentScale) * 0.18;

      const speed = Math.sqrt(ringVx * ringVx + ringVy * ringVy);
      const stretch = Math.min(speed * 0.012, 0.35);
      const angle = Math.atan2(ringVy, ringVx);

      ringMesh.rotation.z = angle;
      haloMesh.rotation.z = time * 0.001; // subtle continuous halo orbit

      ringMesh.scale.set(
        ringCurrentScale * (1 + stretch),
        ringCurrentScale * (1 - stretch * 0.5),
        1,
      );
      haloMesh.scale.set(
        ringCurrentScale * 1.15,
        ringCurrentScale * 1.15,
        1,
      );

      // Opacity transitions
      ringMat.opacity = THREE.MathUtils.lerp(
        ringMat.opacity,
        isInteractive ? 0.65 : 0.4,
        0.1,
      );
      haloMat.opacity = THREE.MathUtils.lerp(
        haloMat.opacity,
        isInteractive ? 0.35 : 0.15,
        0.1,
      );

      // 3. Update Trail Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= delta / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.size = p.baseSize * p.life;
      }

      // Re-populate particle buffers
      const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
      const colAttr = particleGeo.getAttribute('color') as THREE.BufferAttribute;
      const sizeAttr = particleGeo.getAttribute('size') as THREE.BufferAttribute;

      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (i < particles.length) {
          const p = particles[i];
          particlePositions[i * 3] = p.x;
          particlePositions[i * 3 + 1] = p.y;
          particlePositions[i * 3 + 2] = 0;

          const alpha = p.life * p.opacity;
          particleColors[i * 3] = colors.particle.r * alpha;
          particleColors[i * 3 + 1] = colors.particle.g * alpha;
          particleColors[i * 3 + 2] = colors.particle.b * alpha;

          particleSizes[i] = p.size;
        } else {
          particlePositions[i * 3] = -999;
          particlePositions[i * 3 + 1] = -999;
          particlePositions[i * 3 + 2] = -999;
          particleColors[i * 3] = 0;
          particleColors[i * 3 + 1] = 0;
          particleColors[i * 3 + 2] = 0;
          particleSizes[i] = 0;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      // 4. Update Click Ripples
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const r = activeRipples[i];
        r.radius += (r.maxRadius - r.radius) * 0.14 + 1.2;
        r.opacity *= 0.91;

        if (r.opacity < 0.02 || r.radius >= r.maxRadius) {
          scene.remove(r.mesh);
          r.mesh.geometry.dispose();
          r.mesh.material.dispose();
          activeRipples.splice(i, 1);
          continue;
        }

        const scale = r.radius / 4;
        r.mesh.scale.set(scale, scale, 1);
        r.mesh.material.opacity = r.opacity;
      }

      // Render Scene
      renderer?.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    // ----------------------------------------------------
    // Event Handlers
    // ----------------------------------------------------
    const showCursor = () => {
      if (!active) {
        active = true;
        document.documentElement.classList.add('custom-cursor');
        canvas.style.opacity = '1';
        if (!rafId) {
          lastFrameTime = performance.now();
          rafId = requestAnimationFrame(render);
        }
      }
    };

    const hideCursor = () => {
      active = false;
      canvas.style.opacity = '0';
      document.documentElement.classList.remove('custom-cursor');
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') {
        hideCursor();
        return;
      }

      const now = performance.now();
      const dt = Math.max((now - lastMoveTime) / 1000, 0.001);
      lastMoveTime = now;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!active) {
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
        prevMouseX = targetX;
        prevMouseY = targetY;
      }

      const speedX = (targetX - prevMouseX) / dt;
      const speedY = (targetY - prevMouseY) / dt;
      prevMouseX = targetX;
      prevMouseY = targetY;

      // Spawn subtle particles on motion
      const dist = Math.sqrt(speedX * speedX + speedY * speedY);
      if (dist > 120 && Math.random() < 0.6) {
        spawnParticle(targetX, targetY, speedX * 0.02, speedY * 0.02);
      }

      // Check for interactive targets
      const targetElement = event.target as Element | null;
      isInteractive = Boolean(
        targetElement &&
        targetElement.closest(
          'a, button, input, textarea, select, [role="button"], label, summary, [data-cursor-interactive]',
        ),
      );

      showCursor();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return;
      isPointerDown = true;
      spawnRipple(event.clientX, event.clientY);
    };

    const onPointerUp = () => {
      isPointerDown = false;
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        hideCursor();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.right = width;
      camera.top = height;
      camera.updateProjectionMatrix();
      renderer?.setSize(width, height);
    };

    // Attach Listeners
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointerout', onPointerLeave);
    window.addEventListener('blur', hideCursor);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    media.addEventListener('change', hideCursor);

    // Cleanup on unmount
    return () => {
      hideCursor();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointerout', onPointerLeave);
      window.removeEventListener('blur', hideCursor);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      media.removeEventListener('change', hideCursor);

      dotGeo.dispose();
      dotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();

      for (const r of activeRipples) {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
      }

      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] opacity-0 transition-opacity duration-300"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
