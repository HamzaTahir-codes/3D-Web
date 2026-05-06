import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import ExperiencePath from '../components/three/ExperiencePath'
import ExperienceStop from '../components/three/ExperienceStop'
import TimelineCamera from '../components/three/TimelineCamera'
import SectionHeader from '../components/ui/SectionHeader'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import Particles from '../components/three/Particles'
import { experiences } from '../data/experienceData'

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = experiences[activeIndex]

  const goNext = () => {
    if (activeIndex < experiences.length - 1)
      setActiveIndex(activeIndex + 1)
  }
  const goPrev = () => {
    if (activeIndex > 0)
      setActiveIndex(activeIndex - 1)
  }

  return (
    <SectionTransition id="experience">
      <div
        id="experience"
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          position: 'relative',
          overscrollBehavior: 'contain',
        }}
      >
        <SectionHeader
          title="Experience"
          subtitle="a journey through time — navigate with arrows"
        />

        <MobileFallback>
          <Canvas
            frameloop="always"
            camera={{ position: [0, 2, 4], fov: 60 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              touchAction: 'pan-y',
            }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.2} />
            <Particles />
            <pointLight
              position={[0, 10, 0]}
              intensity={1}
              color="#ffffff"
            />
            <pointLight
              position={[
                0,
                2,
                -activeIndex * 6,
              ]}
              intensity={4}
              color={active.color}
              distance={8}
            />

            <Suspense fallback={null}>
              <Stars
                radius={60}
                depth={30}
                count={800}
                factor={3}
                fade
              />
              <ExperiencePath
                activeIndex={activeIndex}
                total={experiences.length}
              />
              {experiences.map((exp, i) => (
                <ExperienceStop
                  key={exp.id}
                  experience={exp}
                  index={i}
                  total={experiences.length}
                  isActive={i === activeIndex}
                  isPast={i < activeIndex}
                />
              ))}
            </Suspense>

            <TimelineCamera
              activeIndex={activeIndex}
              total={experiences.length}
            />
          </Canvas>
        </MobileFallback>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '680px',
              background: 'rgba(6,6,14,0.96)',
              border: `1px solid ${active.color}`,
              borderRadius: '12px',
              padding: '24px 28px',
              fontFamily: 'monospace',
              zIndex: 50,
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              <div>
                <div style={{
                  fontSize: '10px',
                  color: active.color,
                  letterSpacing: '0.15em',
                  marginBottom: '4px',
                }}>
                  {active.year} · {active.location}
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  marginBottom: '2px',
                }}>
                  {active.role}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#555',
                }}>
                  {active.company}
                </div>
              </div>

              {/* Progress dots */}
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}>
                {experiences.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i <= activeIndex
                        ? active.color : '#222',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Summary */}
            <p style={{
              fontSize: '13px',
              color: '#888',
              lineHeight: '1.8',
              marginBottom: '16px',
            }}>
              {active.summary}
            </p>

            {/* Highlights */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '20px',
            }}>
              {active.highlights.map((h, i) => (
                <span key={i} style={{
                  fontSize: '11px',
                  padding: '4px 12px',
                  border: `1px solid ${active.color}44`,
                  borderRadius: '20px',
                  color: active.color,
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                style={{
                  background: 'none',
                  border: '1px solid #222',
                  color: activeIndex === 0
                    ? '#222' : '#ffffff',
                  borderRadius: '6px',
                  padding: '8px 20px',
                  cursor: activeIndex === 0
                    ? 'default' : 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              >
                ← earlier
              </button>
              <button
                onClick={goNext}
                disabled={
                  activeIndex === experiences.length - 1
                }
                style={{
                  background: activeIndex ===
                    experiences.length - 1
                    ? 'none'
                    : active.color,
                  border: `1px solid ${
                    activeIndex === experiences.length - 1
                      ? '#222' : active.color
                  }`,
                  color: activeIndex ===
                    experiences.length - 1
                    ? '#222' : '#ffffff',
                  borderRadius: '6px',
                  padding: '8px 20px',
                  cursor: activeIndex ===
                    experiences.length - 1
                    ? 'default' : 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              >
                next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionTransition>
  )
}
