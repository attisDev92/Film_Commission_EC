import { motion, useScroll, useTransform } from 'framer-motion'
import image01 from '../../../assets/images/incentivos_01.png'
import image02 from '../../../assets/images/incentivos_02.png'
import image03 from '../../../assets/images/incentivos_03.png'
import image04 from '../../../assets/images/incentivos_04.png'
import image05 from '../../../assets/images/incentivos_05.png'
import image06 from '../../../assets/images/incentivos_06.png'
import image07 from '../../../assets/images/incentivos_07.png'
import image08 from '../../../assets/images/incentivos_08.png'
import styles from './Incentives.module.css'
import ImageContainer from './ImageContainer'
import { useRef } from 'react'

const images: string[] = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
]

const Incentives = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-100%'])

  return (
    <section id="incentives">
      <div className={styles.carousel} ref={targetRef}>
        <div className={styles.contentContainer}>
          <motion.div className={styles.images} style={{ x }}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={styles.imagesItem}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
              >
                <ImageContainer imageSource={image} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Incentives
