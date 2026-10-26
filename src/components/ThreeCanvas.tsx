import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect WebGL capability & software renderer
    let glContext: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    try {
      const probeCanvas = document.createElement('canvas');
      glContext = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!glContext) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const isSoftwareGl = (() => {
      if (!glContext) return true;
      try {
        const ext = glContext.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glContext.RENDERER;
        const gpu = String(glContext.getParameter(param));
        glContext.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Setup Three.js scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    container.appendChild(renderer.domElement);

    // Group for objects responsive to mouse/scroll parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.2);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x38bdf8, 0x07090e, 1.5);
    scene.add(hemisphereLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.8);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const violetRimLight = new THREE.DirectionalLight(0xa855f7, 3.2);
    violetRimLight.position.set(-8, -4, -4);
    scene.add(violetRimLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 2.5, 25);
    cyanPoint.position.set(3, -2, 4);
    scene.add(cyanPoint);

    // 2. Central Hero Floating Geometric Cluster
    const centralCluster = new THREE.Group();
    centralCluster.position.set(3.5, 0.5, 0); // Positioned towards the right to complement left-aligned hero copy
    worldGroup.add(centralCluster);

    // Inner Torus Knot - Futuristic metallic core
    const knotGeom = new THREE.TorusKnotGeometry(1.6, 0.38, 120, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      roughness: 0.22,
      metalness: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(knotGeom, knotMat);
    centralCluster.add(torusKnot);

    // Outer Glass-like Polyhedron Cage
    const cageGeom = new THREE.IcosahedronGeometry(2.7, 0);
    const cageMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 0.65,
      wireframe: true,
    });
    const outerCage = new THREE.Mesh(cageGeom, cageMat);
    centralCluster.add(outerCage);

    // Floating Glass Spheres and Octahedrons around the scene
    const floatingObjects: {
      mesh: THREE.Mesh;
      baseY: number;
      speedY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      phase: number;
    }[] = [];

    // Subtle glass material for floating satellites
    const glassSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.7,
      clearcoat: 0.8,
    });

    const cyanGemMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      roughness: 0.2,
      metalness: 0.7,
      clearcoat: 0.7,
      transparent: true,
      opacity: 0.8,
    });

    const violetOctaMat = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      roughness: 0.25,
      metalness: 0.8,
      clearcoat: 0.5,
    });

    const satelliteConfigs = [
      { geom: new THREE.SphereGeometry(0.55, 32, 32), mat: glassSphereMat, pos: [6.2, 2.8, -2] },
      { geom: new THREE.OctahedronGeometry(0.75, 0), mat: cyanGemMat, pos: [-4.5, 2.2, -3] },
      { geom: new THREE.IcosahedronGeometry(0.65, 0), mat: violetOctaMat, pos: [-3.8, -3.2, -1] },
      { geom: new THREE.SphereGeometry(0.4, 24, 24), mat: glassSphereMat, pos: [5.2, -2.6, 1] },
      { geom: new THREE.TorusGeometry(0.8, 0.08, 16, 50), mat: cyanGemMat, pos: [1.5, 3.8, -2] },
      { geom: new THREE.OctahedronGeometry(0.45, 0), mat: violetOctaMat, pos: [0.8, -4.2, -3] },
    ];

    satelliteConfigs.forEach((config, idx) => {
      const mesh = new THREE.Mesh(config.geom, config.mat);
      mesh.position.set(config.pos[0], config.pos[1], config.pos[2]);
      worldGroup.add(mesh);
      floatingObjects.push({
        mesh,
        baseY: config.pos[1],
        speedY: 0.8 + (idx % 3) * 0.4,
        rotSpeedX: 0.005 + (idx % 2) * 0.004,
        rotSpeedY: 0.007 + (idx % 3) * 0.003,
        phase: idx * 1.3,
      });
    });

    // 3. Subtle Cybernetic Particle Starfield
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 220 : 650;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x38bdf8); // Cyan
    const c2 = new THREE.Color(0x818cf8); // Indigo
    const c3 = new THREE.Color(0xc084fc); // Violet

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;

      const pick = Math.random();
      const col = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Simple procedural circular dot texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pctx = particleCanvas.getContext('2d');
    if (pctx) {
      const grad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(165, 180, 252, 0.8)');
      grad.addColorStop(0.8, 'rgba(99, 102, 241, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pctx.fillStyle = grad;
      pctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.22,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    worldGroup.add(particles);

    // 4. Parallax & Mouse/Touch Interaction
    const targetParallax = { x: 0, y: 0 };
    const currentParallax = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;
      targetParallax.x = normX * 0.8;
      targetParallax.y = normY * 0.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;

      // Adjust cluster positioning for smaller viewports
      if (width < 768) {
        centralCluster.position.set(0, 1.2, -2);
        centralCluster.scale.set(0.65, 0.65, 0.65);
      } else if (width < 1024) {
        centralCluster.position.set(2.2, 0.8, -1);
        centralCluster.scale.set(0.85, 0.85, 0.85);
      } else {
        centralCluster.position.set(3.6, 0.4, 0);
        centralCluster.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    function renderFrame() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Smooth exponential damping on parallax
      if (!prefersReducedMotion) {
        currentParallax.x = THREE.MathUtils.damp(currentParallax.x, targetParallax.x, 3.5, delta);
        currentParallax.y = THREE.MathUtils.damp(currentParallax.y, targetParallax.y, 3.5, delta);
        worldGroup.position.x = currentParallax.x;
        worldGroup.position.y = currentParallax.y;

        // Subtle camera tilt
        camera.rotation.y = -currentParallax.x * 0.08;
        camera.rotation.x = currentParallax.y * 0.08;

        // Animate central cluster
        torusKnot.rotation.x += 0.4 * delta;
        torusKnot.rotation.y += 0.6 * delta;
        outerCage.rotation.x -= 0.2 * delta;
        outerCage.rotation.y -= 0.3 * delta;

        // Floating satellites
        floatingObjects.forEach((obj) => {
          obj.mesh.position.y = obj.baseY + Math.sin(elapsedTime * obj.speedY + obj.phase) * 0.35;
          obj.mesh.rotation.x += obj.rotSpeedX;
          obj.mesh.rotation.y += obj.rotSpeedY;
        });

        // Slow particle drift
        particles.rotation.y += 0.03 * delta;
        particles.rotation.x += 0.015 * delta;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderFrame);
    }

    animationFrameId = requestAnimationFrame(renderFrame);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      try {
        knotGeom.dispose();
        knotMat.dispose();
        cageGeom.dispose();
        cageMat.dispose();
        particleGeom.dispose();
        particleMat.dispose();
        particleTexture.dispose();
        satelliteConfigs.forEach((c) => {
          c.geom.dispose();
          c.mat.dispose();
        });
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (err) {
        console.warn('Error during Three.js cleanup:', err);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {webglSupported ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        /* CSS Animated Fallback when WebGL is unavailable */
        <div className="w-full h-full relative bg-[#07090e] overflow-hidden">
          {/* Subtle gradient auras */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px]" />
          {/* Subtle decorative geometric SVG rings */}
          <svg className="absolute right-10 top-24 w-80 h-80 opacity-20 text-indigo-400 stroke-current" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.8" />
            <polygon points="50,15 80,75 20,75" strokeWidth="0.6" strokeDasharray="2 2" />
          </svg>
        </div>
      )}
    </div>
  );
}
