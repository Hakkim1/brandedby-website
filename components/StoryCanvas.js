"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StoryCanvas({ activeChapter }) {
  const containerRef = useRef(null);
  const meshRef = useRef(null);
  const geometriesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const currentContainer = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentContainer.clientWidth / currentContainer.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(
      currentContainer.clientWidth,
      currentContainer.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // List of geometries matching the metaphors of the 8 chapters
    const geometries = [
      new THREE.BoxGeometry(1.2, 1.2, 1.2), // Ch 1: Separation/Cubes
      new THREE.SphereGeometry(0.8, 32, 32), // Ch 2: Messages/Sphere
      new THREE.TorusGeometry(0.7, 0.25, 12, 48), // Ch 3: Connection/Torus
      new THREE.OctahedronGeometry(1.0, 0), // Ch 4: Quarantine/Octahedron
      new THREE.ConeGeometry(0.7, 1.3, 32), // Ch 5: Split paths/Cone
      new THREE.TorusKnotGeometry(0.5, 0.18, 64, 8), // Ch 6: Divergent paths/Knot
      new THREE.CylinderGeometry(0.5, 0.5, 1.3, 32), // Ch 7: Converging/Cylinder
      new THREE.RingGeometry(0.3, 0.9, 32), // Ch 8: Completed B ring
    ];
    geometriesRef.current = geometries;

    // Wireframe material representing digital construction blueprint
    const material = new THREE.MeshStandardMaterial({
      color: 0x7d68f8, // Brand Violet
      emissive: 0x7d68f8,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometries[0], material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x9f91fa, 2.5, 30); // Brand Violet Light
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    // Intersection Observer to stop render loop when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(currentContainer);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip updating and rendering if not in viewport

      // Fixed light theme intensities
      ambientLight.intensity = 1.3;
      pointLight.intensity = 1.2;

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.006;
        meshRef.current.rotation.y += 0.009;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentContainer) return;
      const width = currentContainer.clientWidth;
      const height = currentContainer.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      geometries.forEach((g) => g.dispose());
      material.dispose();
    };
  }, []);

  // Update geometry and colors on activeChapter changes
  useEffect(() => {
    if (meshRef.current && geometriesRef.current.length > 0) {
      const activeGeo =
        geometriesRef.current[activeChapter % geometriesRef.current.length];
      if (activeGeo) {
        // Toggle material color based on active index (Purple spectrum only)
        const colorHex = activeChapter % 2 === 0 ? 0x7d68f8 : 0x9f91fa;
        meshRef.current.material.color.setHex(colorHex);
        meshRef.current.material.emissive.setHex(colorHex);
        meshRef.current.geometry = activeGeo;
      }
    }
  }, [activeChapter]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] md:h-[400px] relative z-10 opacity-60"
    />
  );
}
