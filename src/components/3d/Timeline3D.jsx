import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { timelineSteps } from '../../lib/data';
import * as THREE from 'three';

const TimelineNode = ({ step, index, activeNode, setActiveNode }) => {
  const meshRef = useRef();
  const isActive = activeNode === index;
  
  // Position nodes along a diagonal path in 3D space
  const position = [
    (index - 1.5) * 3, 
    (1.5 - index) * 1.5, 
    (index - 1.5) * -2
  ];

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      // Scale pulse when active
      const targetScale = isActive ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh 
          ref={meshRef}
          onClick={() => setActiveNode(index)}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <icosahedronGeometry args={[0.5, 1]} />
          <MeshDistortMaterial 
            color={step.color} 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0} 
            metalness={0.8}
            roughness={0.2}
            distort={isActive ? 0.4 : 0.2}
            speed={isActive ? 4 : 2}
          />
        </mesh>
      </Float>

      {/* Connection Line to next node (if not last) */}
      {index < timelineSteps.length - 1 && (
        <Line
          points={[
            [0, 0, 0],
            [3, -1.5, -2] // Vector to next node
          ]}
          color="rgba(255, 255, 255, 0.2)"
          lineWidth={1}
          dashed={true}
          dashSize={0.2}
        />
      )}

      {/* Holographic Text Label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {step.title}
      </Text>

      {/* HTML Overlay Panel (Visible when active) */}
      {isActive && (
        <Html position={[1, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel p-4 rounded-xl w-64 text-left pointer-events-auto transition-all animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white">
                {step.date}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default function Timeline3D() {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <group position={[0, 0, 0]}>
      {timelineSteps.map((step, index) => (
        <TimelineNode 
          key={step.id} 
          step={step} 
          index={index} 
          activeNode={activeNode} 
          setActiveNode={setActiveNode} 
        />
      ))}
    </group>
  );
}
