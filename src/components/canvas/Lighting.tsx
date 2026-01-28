interface LightingProps {
  isHero?: boolean
  isDarkMode?: boolean
}

export function Lighting({ isHero = false, isDarkMode = false }: LightingProps) {
  const intensity = isHero ? 1.2 : 1
  
  // Dark mode has more dramatic, studio-style lighting
  if (isDarkMode) {
    return (
      <>
        {/* Key light - strong directional with blue tint */}
        <directionalLight
          position={[10, 12, 8]}
          intensity={3 * intensity}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Blue accent light from left */}
        <directionalLight
          position={[-10, 5, 5]}
          intensity={2 * intensity}
          color="#4488ff"
        />
        
        {/* Orange/warm accent from right */}
        <directionalLight
          position={[10, 3, -5]}
          intensity={1.5 * intensity}
          color="#ff8844"
        />

        {/* Rim light - strong backlight for edge definition */}
        <directionalLight
          position={[0, 8, -12]}
          intensity={2.5 * intensity}
          color="#ffffff"
        />

        {/* Top spot for dramatic highlight */}
        <spotLight
          position={[0, 20, 0]}
          angle={0.4}
          penumbra={1}
          intensity={3 * intensity}
          color="#ffffff"
          castShadow={false}
        />

        {/* Subtle blue floor bounce */}
        <directionalLight
          position={[0, -5, 0]}
          intensity={0.3 * intensity}
          color="#4466aa"
        />
        
        {/* Low ambient for dark mood */}
        <ambientLight intensity={0.15} color="#334455" />
        
        {/* Hemisphere for subtle sky/ground */}
        <hemisphereLight
          args={['#223344', '#111122', 0.4 * intensity]}
        />
      </>
    )
  }

  // Light mode - clean studio lighting
  return (
    <>
      {/* Key light - main illumination from front-right */}
      <directionalLight
        position={[8, 10, 8]}
        intensity={2.5 * intensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light - softer, from left side */}
      <directionalLight
        position={[-8, 6, 4]}
        intensity={1.5 * intensity}
        color="#f5f5ff"
      />
      
      {/* Back/rim light - creates edge definition */}
      <directionalLight
        position={[0, 8, -10]}
        intensity={1.8 * intensity}
        color="#ffffff"
      />

      {/* Top light - overall soft illumination */}
      <directionalLight
        position={[0, 15, 0]}
        intensity={1 * intensity}
        color="#ffffff"
      />

      {/* Front fill - reduces harsh shadows on front */}
      <directionalLight
        position={[0, 3, 10]}
        intensity={0.8 * intensity}
        color="#fafafa"
      />
      
      {/* Ambient light - base illumination */}
      <ambientLight intensity={0.6 * intensity} color="#ffffff" />
      
      {/* Hemisphere light - sky/ground color simulation */}
      <hemisphereLight
        args={['#ffffff', '#e8e8e8', 0.8 * intensity]}
      />

      {/* Spot light for hero - dramatic highlight */}
      {isHero && (
        <spotLight
          position={[0, 20, 0]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#ffffff"
          castShadow={false}
        />
      )}
    </>
  )
}
