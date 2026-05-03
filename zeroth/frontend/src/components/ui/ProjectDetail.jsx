import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectDetail({ project, onClose, onExplore }) {
  if (!project) return null

  const categoryColors = {
    fullstack: '#4f46e5',
    iot: '#10b981',
    mobile: '#f59e0b',
    other: '#6b7280',
  }
  const color = categoryColors[project.category] || '#6b7280'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          background: 'rgba(10,10,20,0.96)',
          border: `1px solid ${color}`,
          borderRadius: '12px',
          padding: '28px 32px',
          zIndex: 100,
          fontFamily: 'monospace',
          color: '#ffffff',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}>
          <div>
            <span style={{
              fontSize: '10px',
              color: color,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '500',
              margin: '4px 0 0',
            }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #333',
              color: '#888',
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            [ close ]
          </button>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: '#aaaaaa',
          lineHeight: '1.7',
          marginBottom: '20px',
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '10px',
            color: '#555',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}>
            TECH STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  border: `1px solid ${color}`,
                  color: color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links + Explore button */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onExplore}
            style={{
              fontSize: '12px',
              color: '#000',
              background: color,
              padding: '8px 18px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontWeight: '600',
            }}
          >
            ⚡ How it was built
          </button>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: '#ffffff',
                border: '1px solid #444',
                padding: '8px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              → Live Site
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: color,
                border: `1px solid ${color}`,
                padding: '8px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              → GitHub
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
