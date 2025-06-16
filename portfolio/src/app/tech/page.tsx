'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const techStack = [
  'HTML5', 'CSS3', 'JavaScript', 'React JS', 'Framer', 'Bootstrap', 'Figma',
  'Redux Toolkit', 'Tailwind CSS', 'Storybook UI', 'T3-App', 'Firebase',
  'Next.js', 'FastAPI', 'DaisyUI', 'Node.js', 'Express.js', 'AWS',
  'MongoDB', 'MySQL', 'Git', 'PostgreSQL', 'MSSQL', 'GSAP', 'Three.js'
];

interface PointSystem {
  points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  originalPosition: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function TechStackParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<PointSystem[] | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 250, 1400);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
    camera.position.z = 1000;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sprite textures for each tech name
    const createTextTexture = (text: string): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get 2D context');
      }
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // Create stronger gradient background
      const gradient = context.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
      
      // Add text with better visibility
      context.fillStyle = '#000000';
      context.strokeStyle = '#ffffff';
      context.lineWidth = 3;
      context.font = 'bold 48px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      context.strokeText(text, size/2, size/2);
      context.fillText(text, size/2, size/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Create particles
    const particleCount = techStack.length;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Create materials for each tech name
    const materials = techStack.map((tech, index) => {
      const texture = createTextTexture(tech);
      const color = new THREE.Color();
      color.setHSL(index / techStack.length, 0.8, 0.7);
      
      return new THREE.PointsMaterial({
        size: 120,
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        color: color,
        blending: THREE.NormalBlending,
        depthWrite: false,
        sizeAttenuation: true
      });
    });

    // Position particles in a sphere
    const color = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      const radius = 500 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      color.setHSL(i / particleCount, 0.8, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 80 + Math.random() * 40;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create individual point systems for each tech name
    const pointSystems: PointSystem[] = [];
    for (let i = 0; i < particleCount; i++) {
      const singleParticle = new THREE.BufferGeometry();
      const pos = new Float32Array([positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]);
      const col = new Float32Array([colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]]);
      const siz = new Float32Array([sizes[i]]);
      
      singleParticle.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      singleParticle.setAttribute('color', new THREE.BufferAttribute(col, 3));
      singleParticle.setAttribute('size', new THREE.BufferAttribute(siz, 1));
      
      const points = new THREE.Points(singleParticle, materials[i]);
      pointSystems.push({
        points,
        originalPosition: new THREE.Vector3(pos[0], pos[1], pos[2]),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        )
      });
      scene.add(points);
    }

    particlesRef.current = pointSystems;

    // Manual camera controls (replacement for OrbitControls)
    const onMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current) {
        const deltaX = event.clientX - previousMousePosition.current.x;
        const deltaY = event.clientY - previousMousePosition.current.y;
        
        cameraRotation.current.y += deltaX * 0.01;
        cameraRotation.current.x += deltaY * 0.01;
        
        // Clamp vertical rotation
        cameraRotation.current.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRotation.current.x));
        
        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.position.z += event.deltaY * 0.5;
      camera.position.z = Math.max(200, Math.min(2000, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Update camera position based on rotation
      const radius = camera.position.z;
      camera.position.x = radius * Math.sin(cameraRotation.current.y) * Math.cos(cameraRotation.current.x);
      camera.position.y = radius * Math.sin(cameraRotation.current.x);
      camera.position.z = radius * Math.cos(cameraRotation.current.y) * Math.cos(cameraRotation.current.x);
      camera.lookAt(0, 0, 0);

      // Auto-rotate when not dragging
      if (!isDragging.current) {
        cameraRotation.current.y += 0.005;
      }

      // Update particle positions
      pointSystems.forEach((system, i) => {
        const { points, originalPosition, velocity } = system;
        
        const angle = time * 0.3 + i * 0.1;
        
        const x = originalPosition.x + Math.cos(angle) * 30 + velocity.x * time * 5;
        const y = originalPosition.y + Math.sin(angle) * 30 + velocity.y * time * 5;
        const z = originalPosition.z + Math.sin(time + i) * 50 + velocity.z * time * 5;
        
        points.position.set(x, y, z);
        points.rotation.z = time * 0.1;
        
        const scale = 1 + Math.sin(time * 1.5 + i) * 0.2;
        points.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      pointSystems.forEach(system => {
        scene.remove(system.points);
        system.points.geometry.dispose();
        if (system.points.material instanceof THREE.PointsMaterial) {
          system.points.material.dispose();
        }
      });
      
      materials.forEach(material => {
        if (material.map) material.map.dispose();
        material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black ">
      <div 
        ref={containerRef} 
        className="w-full h-full  cursor-pointer"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f0f23 50%, #000000 100%)' }}
      />
    </div>
  );
}