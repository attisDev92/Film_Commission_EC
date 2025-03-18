import { motion, MotionValue, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { AboutEcuador } from '../../../types'
import styles from './About.module.css'
import { useLanguageSelected } from '../../../hooks/useLanguages'

const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance])
}

const AboutCard: React.FC<AboutEcuador> = ({ source, title, text }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <div className={styles.imgContainer}>
      <div ref={ref}>
        <img src={source} />
      </div>
      <motion.div
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        style={{ y }}
      >
        <h3>{title}</h3>
        <p>{text}</p>
      </motion.div>
    </div>
  )
}

const About = () => {
  const content = useLanguageSelected().aboutEcuador

  return (
    <div className={styles.aboutEcuador}>
      {content.map((item, i) => (
        <AboutCard
          key={i}
          source={item.source}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  )
}

export default About
