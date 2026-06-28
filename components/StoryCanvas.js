"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StoryCanvas({ activeChapter }) {
  const containerRef = useRef(null);
  
  // Ref to hold targeted coordinates for lerp animations
  const targetsRef = useRef({
    m1Pos: new THREE.Vector3(-1.3, 0, 0),
    m2Pos: new THREE.Vector3(1.3, 0, 0),
    m1Scale: new THREE.Vector3(1, 1, 1),
    m2Scale: new THREE.Vector3(1, 1, 1),
    m1Vis: true,
    m2Vis: true,
    groupVis: false,
    ringVis: false,
    lineVis: false,
  });

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
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // Create wireframe premium blueprint style materials
    const createMaterial = (color) => new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });

    const matPurple = createMaterial(0x7d68f8); // Bhuvanesh (Creativity)
    const matPink = createMaterial(0x9f91fa);   // Hakkim (Systems/Marketing)

    // Node 1: BoxGeometry (representing Structure, Systems, Digital Cybersecurity)
    const geo1 = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const mesh1 = new THREE.Mesh(geo1, matPink);
    scene.add(mesh1);

    // Node 2: OctahedronGeometry (representing Fluidity, Art, Design Strategy)
    const geo2 = new THREE.OctahedronGeometry(0.6, 0);
    const mesh2 = new THREE.Mesh(geo2, matPurple);
    scene.add(mesh2);

    // Joint representation: TorusKnot (representing intertwined brotherhood/trust)
    const geoGroup = new THREE.TorusKnotGeometry(0.5, 0.16, 80, 12);
    const groupMesh = new THREE.Mesh(geoGroup, matPurple);
    scene.add(groupMesh);

    // Unified representation: Torus (representing the completed Brandedby circle logo)
    const geoRing = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const ringMesh = new THREE.Mesh(geoRing, matPink);
    scene.add(ringMesh);

    // Connection Line (drawn between nodes to represent messages, paths, and anchors)
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x9f91fa, 
      opacity: 0.5, 
      transparent: true 
    });
    const linePoints = [mesh1.position, mesh2.position];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const connectionLine = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(connectionLine);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x9f91fa, 1.2, 30);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    // Intersection Observer to pause execution loop when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(currentContainer);

    // Animation Loop with smooth LERP transitions
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const t = targetsRef.current;
      const lerpSpeed = 0.07; // Smooth transition speed

      // Smooth Position transition
      mesh1.position.lerp(t.m1Pos, lerpSpeed);
      mesh2.position.lerp(t.m2Pos, lerpSpeed);

      // Smooth Scale transition
      mesh1.scale.lerp(t.m1Scale, lerpSpeed);
      mesh2.scale.lerp(t.m2Scale, lerpSpeed);

      // Visibilities
      mesh1.visible = t.m1Vis;
      mesh2.visible = t.m2Vis;
      groupMesh.visible = t.groupVis;
      ringMesh.visible = t.ringVis;
      connectionLine.visible = t.lineVis;

      // Update line points coordinates dynamically in real-time
      if (t.lineVis) {
        const positions = connectionLine.geometry.attributes.position.array;
        positions[0] = mesh1.position.x;
        positions[1] = mesh1.position.y;
        positions[2] = mesh1.position.z;
        positions[3] = mesh2.position.x;
        positions[4] = mesh2.position.y;
        positions[5] = mesh2.position.z;
        connectionLine.geometry.attributes.position.needsUpdate = true;
      }

      // Rotate active components
      if (mesh1.visible) {
        mesh1.rotation.x += 0.008;
        mesh1.rotation.y += 0.012;
      }
      if (mesh2.visible) {
        mesh2.rotation.x -= 0.007;
        mesh2.rotation.y += 0.010;
      }
      if (groupMesh.visible) {
        groupMesh.rotation.x += 0.005;
        groupMesh.rotation.y += 0.007;
      }
      if (ringMesh.visible) {
        ringMesh.rotation.x += 0.004;
        ringMesh.rotation.y += 0.006;
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
      geo1.dispose();
      geo2.dispose();
      geoGroup.dispose();
      geoRing.dispose();
      lineGeometry.dispose();
      matPurple.dispose();
      matPink.dispose();
      lineMaterial.dispose();
    };
  }, []);

  // Update target states when activeChapter prop changes
  useEffect(() => {
    const t = targetsRef.current;
    
    switch (activeChapter) {
      case 0: // Ch 1: Two separate worlds (separate orbiting boxes)
        t.m1Pos.set(-1.4, 0, 0);
        t.m2Pos.set(1.4, 0, 0);
        t.m1Scale.set(1, 1, 1);
        t.m2Scale.set(1, 1, 1);
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = false;
        break;
      case 1: // Ch 2: One phone number, connecting (line of communication between them)
        t.m1Pos.set(-0.8, 0.4, 0);
        t.m2Pos.set(0.8, -0.4, 0);
        t.m1Scale.set(1, 1, 1);
        t.m2Scale.set(1, 1, 1);
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = true;
        break;
      case 2: // Ch 3: Brotherhood (Intertwined knot representing unified trust)
        t.m1Vis = false;
        t.m2Vis = false;
        t.groupVis = true;
        t.ringVis = false;
        t.lineVis = false;
        break;
      case 3: // Ch 4: Lockdown, 420 hours (anchored side by side, connected via virtual link)
        t.m1Pos.set(-0.45, 0, 0);
        t.m2Pos.set(0.45, 0, 0);
        t.m1Scale.set(1.1, 1.1, 1.1);
        t.m2Scale.set(1.1, 1.1, 1.1);
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = true;
        break;
      case 4: // Ch 5: Split promises, walking away (nodes moving in unison to the top-left departure path)
        t.m1Pos.set(-0.5, -0.6, 0);
        t.m2Pos.set(0.5, -0.6, 0);
        t.m1Scale.set(0.85, 0.85, 0.85);
        t.m2Scale.set(0.85, 0.85, 0.85);
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = false;
        break;
      case 5: // Ch 6: Separated building (Kerala vs Bangalore - stretched into parallel pillars)
        t.m1Pos.set(-1.3, 0, 0);
        t.m2Pos.set(1.3, 0, 0);
        t.m1Scale.set(0.7, 1.9, 0.7); // Vertically stretched cyber-pillar
        t.m2Scale.set(0.7, 1.9, 0.7); // Vertically stretched design-pillar
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = false;
        break;
      case 6: // Ch 7: One conversation, return (nodes converging very close in the center)
        t.m1Pos.set(-0.3, 0, 0);
        t.m2Pos.set(0.3, 0, 0);
        t.m1Scale.set(1, 1, 1);
        t.m2Scale.set(1, 1, 1);
        t.m1Vis = true;
        t.m2Vis = true;
        t.groupVis = false;
        t.ringVis = false;
        t.lineVis = false;
        break;
      case 7: // Ch 8: Unified Brandedby (nodes fully merge into a premium spinning torus ring)
        t.m1Vis = false;
        t.m2Vis = false;
        t.groupVis = false;
        t.ringVis = true;
        t.lineVis = false;
        break;
    }
  }, [activeChapter]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] md:h-[400px] relative z-10 opacity-75"
    />
  );
}
