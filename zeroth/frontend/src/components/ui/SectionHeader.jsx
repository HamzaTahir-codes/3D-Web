import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        top: '36px',
        left: 0,
        right: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#333',
        letterSpacing: '0.25em',
        marginBottom: '6px',
        textTransform: 'uppercase',
      }}>
        — zeroth —
      </div>
      <div style={{
        fontFamily: 'monospace',
        fontSize: '28px',
        fontWeight: '500',
        color: '#ffffff',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#444',
          marginTop: '6px',
          letterSpacing: '0.1em',
        }}>
          {subtitle}
        </div>
      )}
    </motion.div>
  )
}
