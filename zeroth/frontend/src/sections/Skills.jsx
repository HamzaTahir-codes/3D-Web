import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SkillNode from '../components/three/SkillNode'
import SkillsCamera from '../components/three/SkillsCamera'
import Particles from '../components/three/Particles'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import SectionHeader from '../components/ui/SectionHeader'
import { skills } from '../data/skillsData'

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null)

  const handleSkillClick = (skill) => {
    setActiveSkill(activeSkill?.id === skill.id ? null : skill)
  }

  return (
    <SectionTransition id="skills">
      <div
        id="skills"
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          position: 'relative',
          overscrollBehavior: 'contain',
        }}
      >
        <SectionHeader
          title="Skills"
          subtitle="click any object to explore"
        />

        <MobileFallback>
          <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 9], fov: 65 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
            }}
            style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 8]} intensity={1.5} color="#ffffff" />
            <pointLight position={[0, 6, 2]} intensity={0.8} color="#4444ff" />
            <pointLight position={[0, -6, 2]} intensity={0.8} color="#ff4444" />
            {activeSkill && (
              <pointLight
                position={activeSkill.position}
                intensity={6}
                color={activeSkill.color}
                distance={8}
              />
            )}
            <Suspense fallback={null}>
              <Particles count={80} />
              {skills.map((skill, i) => (
                <SkillNode
                  key={skill.id}
                  index={i}
                  position={skill.position}
                  name={skill.name}
                  type={skill.type}
                  color={skill.color}
                  isActive={activeSkill?.id === skill.id}
                  onClick={() => handleSkillClick(skill)}
                />
              ))}
            </Suspense>
            <SkillsCamera
              targetPosition={activeSkill?.position}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={!activeSkill}
              autoRotateSpeed={0.4}
            />
          </Canvas>
        </MobileFallback>

        {/* Skill story panel */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'absolute',
                right: '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '300px',
                background: 'rgba(8,8,16,0.95)',
                border: `1px solid ${activeSkill.color}`,
                borderRadius: '12px',
                padding: '24px',
                fontFamily: 'monospace',
                zIndex: 50,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{
                fontSize: '10px',
                color: activeSkill.color,
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}>
                {activeSkill.years}
              </div>

              <div style={{
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: '500',
                marginBottom: '14px',
              }}>
                {activeSkill.name}
              </div>

              <p style={{
                fontSize: '12px',
                color: '#888',
                lineHeight: '1.8',
                marginBottom: '20px',
              }}>
                {activeSkill.story}
              </p>

              <div style={{
                fontSize: '10px',
                color: '#333',
                letterSpacing: '0.1em',
                marginBottom: '10px',
              }}>
                USED FOR
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}>
                {activeSkill.used_for.map((u) => (
                  <span key={u} style={{
                    fontSize: '10px',
                    padding: '3px 10px',
                    border: `1px solid ${activeSkill.color}55`,
                    borderRadius: '20px',
                    color: activeSkill.color,
                  }}>
                    {u}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveSkill(null)}
                style={{
                  marginTop: '20px',
                  background: 'none',
                  border: '1px solid #222',
                  color: '#555',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  width: '100%',
                }}
              >
                [ close ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeSkill && (
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#333',
            letterSpacing: '0.1em',
          }}>
            click any object to explore
          </div>
        )}
      </div>
    </SectionTransition>
  )
}
