import { useRef, useEffect, useState } from 'react'
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
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          variants={variants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
