import { Canvas } from '@react-three/fiber';
import { Box, Edges } from '@react-three/drei';

function PlotBox({ length, width, status }) {
  const getColor = () => {
    if (status === 'available') return '#22c55e';
    if (status === 'reserved') return '#eab308';
    return '#ef4444';
  };

  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[length, 1, width]} />
      <meshStandardMaterial color={getColor()} />
      <Edges color="black" threshold={15} />
    </mesh>
  );
}

export default function PlotViewer({ length = 10, width = 10, status = 'available' }) {
  return (
    <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <PlotBox length={length} width={width} status={status} />
      <gridHelper args={[30, 30]} />
    </Canvas>
  );
}
