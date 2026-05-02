import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

export default function SectionTransition({ children, id }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
