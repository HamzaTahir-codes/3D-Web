import { useState, Suspense, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SpiralNode from '../three/SpiralNode'
import SpiralPath from '../three/SpiralPath'
import SpiralCamera from '../three/SpiralCamera'
import { spiralPhases, getProjectContext } from '../../data/spiralWorkflow'
import { useTypedText } from '../../hooks/useTypedText'

function TypedPanel({ phase, project }) {
  const contextMap = getProjectContext(project.category)
  const context = contextMap[project.category] || contextMap.other
  const displayed = useTypedText(phase.lines, 22)

  return (
    <div style={{
      fontFamily: 'monospace',
      color: '#ffffff',
      maxWidth: '360px',
    }}>
      <div style={{
        fontSize: '10px',
        color: phase.color,
        letterSpacing: '0.15em',
        marginBottom: '16px',
      }}>
        PHASE {phase.id} / {spiralPhases.length} — {phase.phase.toUpperCase()}
      </div>

      <div style={{ minHeight: '120px', marginBottom: '24px' }}>
        {displayed.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '15px',
              color: i === displayed.length - 1 ? '#ffffff' : '#555555',
              lineHeight: '1.8',
              margin: '0 0 4px',
            }}
          >
            {line}
            {i === displayed.length - 1 && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                background: phase.color,
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
              }} />
            )}
          </motion.p>
        ))}
      </div>

      {context && (
        <div>
          <div style={{
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}>
            STACK FOR THIS PROJECT
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {context.stack.map((t) => (
              <span key={t} style={{
                fontSize: '11px',
                padding: '3px 10px',
                border: `1px solid ${phase.color}55`,
                borderRadius: '20px',
                color: phase.color,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SpiralExperience({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pulseKeys, setPulseKeys] = useState(
    spiralPhases.map(() => 0)
  )
  const orbitRef = useRef()
  const phase = spiralPhases[activeIndex]

  const activatePhase = (index) => {
    setActiveIndex(index)
    setPulseKeys((prev) => {
      const next = [...prev]
      next[index] = prev[index] + 1
      return next
    })
  }

  const goNext = () => {
    if (activeIndex < spiralPhases.length - 1)
      activatePhase(activeIndex + 1)
  }
  const goPrev = () => {
    if (activeIndex > 0)
      activatePhase(activeIndex - 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        borderBottom: '1px solid #111',
        fontFamily: 'monospace',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.15em',
          }}>
            HOW IT WAS BUILT
          </div>
          <div style={{
            fontSize: '16px',
            color: '#fff',
            marginTop: '2px',
          }}>
            {project.title}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {spiralPhases.map((p, i) => (
            <div
              key={p.id}
              onClick={() => activatePhase(i)}
              style={{
                width: '28px',
                height: '3px',
                borderRadius: '2px',
                background: i <= activeIndex ? p.color : '#1a1a1a',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid #222',
            color: '#555',
            borderRadius: '6px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          [ exit ]
        </button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* 3D canvas */}
        <div style={{ flex: 1 }}>
          <Canvas
            camera={{ position: [0, 0, 11], fov: 58 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
            }}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 6]} intensity={2} />
            <pointLight
              position={spiralPhases[activeIndex].position}
              intensity={5}
              color={spiralPhases[activeIndex].color}
            />

            {/* Tilt the entire spiral group */}
            <group rotation={[0.52, 0.18, 0.12]}>
              <Suspense fallback={null}>
                <SpiralPath activeIndex={activeIndex} />
                {spiralPhases.map((p, i) => (
                  <SpiralNode
                    key={p.id}
                    index={i}
                    position={p.position}
                    color={p.color}
                    icon={p.icon}
                    phase={p.phase}
                    isActive={i === activeIndex}
                    isCompleted={i < activeIndex}
                    pulseKey={pulseKeys[i]}
                    onClick={() => activatePhase(i)}
                  />
                ))}
              </Suspense>
            </group>

            <SpiralCamera
              targetPosition={spiralPhases[activeIndex].position}
              activeIndex={activeIndex}
            />

            <OrbitControls
              ref={orbitRef}
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              minDistance={6}
              maxDistance={16}
            />
          </Canvas>
        </div>

        {/* Text panel */}
        <div style={{
          width: '380px',
          borderLeft: '1px solid #111',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TypedPanel phase={phase} project={project} />
            </motion.div>
          </AnimatePresence>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '32px',
          }}>
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              style={{
                background: 'none',
                border: '1px solid #222',
                color: activeIndex === 0 ? '#222' : '#fff',
                borderRadius: '6px',
                padding: '10px 24px',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                fontFamily: 'monospace',
                fontSize: '13px',
              }}
            >
              ← prev
            </button>
            <button
              onClick={activeIndex === spiralPhases.length - 1
                ? onClose : goNext}
              style={{
                background: activeIndex === spiralPhases.length - 1
                  ? phase.color : 'none',
                border: `1px solid ${
                  activeIndex === spiralPhases.length - 1
                    ? phase.color : '#333'
                }`,
                color: '#fff',
                borderRadius: '6px',
                padding: '10px 24px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '13px',
              }}
            >
              {activeIndex === spiralPhases.length - 1
                ? 'done ✓' : 'next →'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
