import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function PlotBox({ length, width, status }) {
  const getColor = () => {
    if (status === 'available') return 'green';
    if (status === 'reserved') return 'yellow';
    return 'red';
  };

  return (
    <mesh>
      <boxGeometry args={[length, 1, width]} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
}

export default function PlotViewer({ length = 10, width = 10, status = 'available' }) {
  return (
    <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PlotBox length={length} width={width} status={status} />
    </Canvas>
  );
}
