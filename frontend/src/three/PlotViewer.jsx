import { Canvas } from '@react-three/fiber';
import { Box, Edges, Text } from '@react-three/drei';

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
      <Text position={[0, 0.1, -width / 2 - 1]} fontSize={0.8} rotation={[-Math.PI / 2, 0, 0]}>
        N
      </Text>
      <Text position={[0, 0.1, width / 2 + 1]} fontSize={0.8} rotation={[-Math.PI / 2, 0, 0]}>
        S
      </Text>
      <Text position={[length / 2 + 1, 0.1, 0]} fontSize={0.8} rotation={[-Math.PI / 2, 0, 0]}>
        E
      </Text>
      <Text position={[-length / 2 - 1, 0.1, 0]} fontSize={0.8} rotation={[-Math.PI / 2, 0, 0]}>
        W
      </Text>
    </Canvas>
  );
}
