import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import WorkspaceNode from '../components/three/WorkspaceNode'
import SectionHeader from '../components/ui/SectionHeader'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import Particles from '../components/three/Particles'
import { workspaceObjects, mindset, vision } from '../data/aboutData'

function DeskSurface() {
  return (
    <group>
      {/* Desk top */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[9, 0.08, 4]} />
        <meshStandardMaterial
          color="#0a0a14"
          emissive="#0a0a20"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Desk edge glow */}
      <mesh position={[0, 0.02, 2.08]}>
        <boxGeometry args={[9, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Desk legs */}
      {[[-3.8, -1.2, -1.6], [3.8, -1.2, -1.6],
      [-3.8, -1.2, 1.6], [3.8, -1.2, 1.6]].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 2.4, 0.1]} />
          <meshStandardMaterial
            color="#0a0a14"
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function About() {
  const [activeObject, setActiveObject] = useState(null)
  const [view, setView] = useState('workspace')

  const handleClick = (obj) => {
    setActiveObject(activeObject?.id === obj.id ? null : obj)
  }

  return (
    <SectionTransition id="about">
      <div
        id="about"
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          position: 'relative',
          overscrollBehavior: 'contain',
        }}
      >
        <SectionHeader
          title="About"
          subtitle="my workspace"
        />

        {/* View toggle */}
        <div style={{
          position: 'absolute',
          top: '168px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 10,
        }}>
          {['workspace', 'mindset', 'vision'].map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v)
                setActiveObject(null)
              }}
              style={{
                background: view === v
                  ? 'rgba(79,70,229,0.15)' : 'none',
                border: `1px solid ${view === v ? '#4f46e5' : '#222'}`,
                color: view === v ? '#ffffff' : '#444',
                borderRadius: '6px',
                padding: '6px 18px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <MobileFallback>
          {view === 'workspace' && (
            <Canvas
              frameloop="demand"
              shadows
              camera={{
                position: [0, 4.5, 7],
                fov: 52,
                near: 0.1,
                far: 100,
              }}
              gl={{
                antialias: true,
                powerPreference: 'high-performance',
              }}
              style={{
                width: '100%',
                height: '100%',
                touchAction: 'pan-y',
              }}
              dpr={[1, 2]}
            >
              {/* Ambient */}
              <ambientLight intensity={
                activeObject ? 0.05 : 0.25
              } />

              <Particles />

              {/* Main overhead light */}
              <pointLight
                position={[0, 6, 2]}
                intensity={activeObject ? 0.2 : 2}
                color="#ffffff"
                castShadow
              />

              {/* Desk edge glow light */}
              <pointLight
                position={[0, 1, 3]}
                intensity={activeObject ? 0.1 : 0.8}
                color="#4f46e5"
              />

              {/* Spotlight on active object */}
              {activeObject && (
                <>
                  <pointLight
                    position={[
                      activeObject.position[0],
                      activeObject.position[1] + 3,
                      activeObject.position[2],
                    ]}
                    intensity={8}
                    color={activeObject.color}
                    distance={5}
                    castShadow
                  />
                  <pointLight
                    position={[
                      activeObject.position[0],
                      activeObject.position[1] + 1,
                      activeObject.position[2] + 2,
                    ]}
                    intensity={4}
                    color="#ffffff"
                    distance={4}
                  />
                </>
              )}

              <Suspense fallback={null}>
                <DeskSurface />
                <ContactShadows
                  position={[0, 0.04, 0]}
                  opacity={0.4}
                  scale={12}
                  blur={2}
                />
                {workspaceObjects.map((obj, i) => (
                  <WorkspaceNode
                    key={obj.id}
                    id={obj.id}
                    index={i}
                    position={obj.position}
                    name={obj.name}
                    color={obj.color}
                    isActive={activeObject?.id === obj.id}
                    isDimmed={
                      activeObject !== null &&
                      activeObject.id !== obj.id
                    }
                    onClick={() => handleClick(obj)}
                  />
                ))}
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!activeObject}
                autoRotateSpeed={0.25}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>
          )}

          {view === 'mindset' && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '140px 40px 40px',
              boxSizing: 'border-box',
            }}>
              <div style={{ maxWidth: '560px', width: '100%' }}>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#333',
                  letterSpacing: '0.2em',
                  marginBottom: '28px',
                }}>
                  HOW I APPROACH PROBLEMS
                </div>
                {mindset.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: '22px',
                      fontFamily: 'monospace',
                    }}
                  >
                    <span style={{
                      color: '#4f46e5',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}>→</span>
                    <span style={{
                      fontSize: '16px',
                      color: '#ffffff',
                      lineHeight: '1.6',
                    }}>
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {view === 'vision' && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '140px 40px 40px',
              boxSizing: 'border-box',
            }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  maxWidth: '600px',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: '10px',
                  color: '#333',
                  letterSpacing: '0.2em',
                  marginBottom: '28px',
                }}>
                  VISION
                </div>
                <p style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  lineHeight: '2.0',
                  fontWeight: '300',
                }}>
                  "{vision}"
                </p>
                <div style={{
                  marginTop: '40px',
                  fontSize: '12px',
                  color: '#333',
                }}>
                  — Muhammad Hamza Tahir
                </div>
              </motion.div>
            </div>
          )}
        </MobileFallback>

        {/* Object story panel */}
        <AnimatePresence>
          {activeObject && view === 'workspace' && (
            <motion.div
              key={activeObject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '520px',
                background: 'rgba(6,6,14,0.97)',
                border: `1px solid ${activeObject.color}`,
                borderRadius: '12px',
                padding: '22px 28px',
                fontFamily: 'monospace',
                zIndex: 50,
                backdropFilter: 'blur(16px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '10px',
                  color: activeObject.color,
                  letterSpacing: '0.15em',
                  marginBottom: '6px',
                }}>
                  {activeObject.represents}
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  marginBottom: '10px',
                }}>
                  {activeObject.name}
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#777',
                  lineHeight: '1.8',
                  margin: 0,
                }}>
                  {activeObject.story}
                </p>
              </div>
              <button
                onClick={() => setActiveObject(null)}
                style={{
                  background: 'none',
                  border: '1px solid #222',
                  color: '#444',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                [ x ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionTransition>
  )
}
