import { motion } from 'framer-motion'

export default function SectionTransition({ children, id }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
