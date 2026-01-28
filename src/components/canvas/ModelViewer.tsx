import { Suspense, useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, Lightformer } from '@react-three/drei'
import { Lighting } from './Lighting'
import { Loader } from '../ui/Loader'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { models } from '../../data/models'

// Preload all models for faster switching
models.forEach(model => {
  useGLTF.preload(model.modelPath)
})

interface ModelViewerProps {
  modelPath: string
  onLoaded?: () => void
  className?: string
  autoRotate?: boolean
  isHero?: boolean
  isDarkMode?: boolean
  zoomLevel?: number
}

interface CarModelProps {
  modelPath: string
  onLoaded: () => void
  autoRotate: boolean
  isHero: boolean
  zoomLevel: number
}

function CarModel({ modelPath, onLoaded, autoRotate, isHero, zoomLevel }: CarModelProps) {
  const gltf = useGLTF(modelPath)
  const reducedMotion = useReducedMotion()
  const groupRef = useRef<THREE.Group>(null!)
  const hasCalledLoaded = useRef(false)

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true)
    
    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Scale - extra large for hero, bigger for complete view in cards
    const maxDim = Math.max(size.x, size.y, size.z)
    const baseScale = isHero ? 11 : 7
    const scale = maxDim > 0 ? (baseScale * zoomLevel) / maxDim : 1
    
    clone.scale.setScalar(scale)
    clone.position.set(
      -center.x * scale, 
      -center.y * scale, 
      -center.z * scale
    )
    
    return clone
  }, [gltf.scene, isHero, zoomLevel])

  useEffect(() => {
    if (clonedScene && !hasCalledLoaded.current) {
      hasCalledLoaded.current = true
      const timer = setTimeout(onLoaded, 200)
      return () => clearTimeout(timer)
    }
  }, [clonedScene, onLoaded])

  // Auto-rotate
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[0, isHero ? 0 : -0.2, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

function LoadingFallback() {
  return null
}

// Studio environment with soft lighting - adapts to dark mode
function StudioEnvironment({ isHero, isDarkMode }: { isHero: boolean; isDarkMode: boolean }) {
  if (isDarkMode) {
    // Dark mode - dramatic colored lighting
    return (
      <Environment resolution={256} background={false}>
        {/* Top - subtle */}
        <Lightformer
          intensity={0.8}
          rotation-x={Math.PI / 2}
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
          color="#111111"
        />
        {/* Right - blue accent */}
        <Lightformer
          intensity={2.5}
          rotation-y={-Math.PI / 2}
          position={[5, 1, 0]}
          scale={[5, 3, 1]}
          color="#4488ff"
        />
        {/* Left - orange accent */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-5, 1, 0]}
          scale={[5, 3, 1]}
          color="#ff6622"
        />
        {/* Back - rim light */}
        <Lightformer
          intensity={4}
          position={[0, 2, -6]}
          scale={[12, 4, 1]}
          color="#ffffff"
        />
      </Environment>
    )
  }

  // Light mode - clean white studio
  return (
    <Environment resolution={256} background={false}>
      {/* Top soft box */}
      <Lightformer
        intensity={isHero ? 2 : 1.5}
        rotation-x={Math.PI / 2}
        position={[0, 5, 0]}
        scale={[10, 10, 1]}
        color="#ffffff"
      />
      {/* Right soft box */}
      <Lightformer
        intensity={isHero ? 1.5 : 1}
        rotation-y={-Math.PI / 2}
        position={[5, 2, 0]}
        scale={[5, 5, 1]}
        color="#fafafa"
      />
      {/* Left soft box */}
      <Lightformer
        intensity={isHero ? 1.5 : 1}
        rotation-y={Math.PI / 2}
        position={[-5, 2, 0]}
        scale={[5, 5, 1]}
        color="#f5f5f5"
      />
      {/* Back soft box */}
      <Lightformer
        intensity={isHero ? 1.2 : 0.8}
        position={[0, 2, -5]}
        scale={[10, 5, 1]}
        color="#ffffff"
      />
      {/* Front subtle fill */}
      <Lightformer
        intensity={0.5}
        position={[0, 0, 5]}
        scale={[10, 3, 1]}
        color="#fefefe"
      />
    </Environment>
  )
}

export function ModelViewer({ 
  modelPath, 
  onLoaded, 
  className = '', 
  autoRotate = true, 
  isHero = false,
  isDarkMode = false,
  zoomLevel = 1
}: ModelViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [key, setKey] = useState(0)

  // Reset loading state when model path changes (not zoom - zoom doesn't need reload)
  useEffect(() => {
    setIsLoaded(false)
    setKey(prev => prev + 1)
  }, [modelPath])

  const handleLoaded = useCallback(() => {
    setIsLoaded(true)
    onLoaded?.()
  }, [onLoaded])

  // Camera position - centered wide view for hero, wider view for cards to see complete model
  const cameraPosition: [number, number, number] = isHero ? [0, 2, 10] : [0, 2.5, 11]
  const fov = isHero ? 55 : 50

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay - transparent background */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Loader message="Loading..." />
      </div>
      
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov,
          near: 0.1,
          far: 100
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDarkMode ? 1.5 : (isHero ? 1.2 : 1),
        }}
        frameloop="always"
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
        aria-label="Interactive 3D model viewer. Drag to rotate."
        role="img"
      >
        {/* No background color - fully transparent */}
        
        <Lighting isHero={isHero} isDarkMode={isDarkMode} />
        
        <Suspense fallback={<LoadingFallback />}>
          <CarModel 
            key={`${modelPath}-${key}`}
            modelPath={modelPath}
            onLoaded={handleLoaded}
            autoRotate={autoRotate}
            isHero={isHero}
            zoomLevel={zoomLevel}
          />
          
          {/* Studio environment for reflections - no background */}
          <StudioEnvironment isHero={isHero} isDarkMode={isDarkMode} />
          
          {/* Strong ground shadow for 3D depth */}
          <ContactShadows
            position={[0, isHero ? -4 : -2.5, 0]}
            opacity={isDarkMode ? 0.9 : (isHero ? 0.7 : 0.5)}
            scale={isHero ? 50 : 20}
            blur={isHero ? 2 : 2}
            far={15}
            color="#000000"
          />
          {/* Additional soft shadow for depth */}
          {isHero && (
            <ContactShadows
              position={[0, -4, 0]}
              opacity={isDarkMode ? 0.4 : 0.25}
              scale={60}
              blur={5}
              far={25}
              color="#000000"
            />
          )}
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.2}
          dampingFactor={0.05}
          enableDamping
          makeDefault
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
