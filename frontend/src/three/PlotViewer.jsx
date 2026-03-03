import { Canvas } from '@react-three/fiber';
import { Edges, Text, OrbitControls, useProgress, Html, Suspense } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#666', fontFamily: 'sans-serif' }}>
        Loading... {Math.round(progress)}%
      </div>
    </Html>
  );
}

function SceneContent({ length, width, status }) {
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
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <SceneContent length={length} width={width} status={status} />
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
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
}
