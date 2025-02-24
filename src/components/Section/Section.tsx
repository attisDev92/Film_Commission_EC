import React from 'react'
import MoreInfo from '../MoreInfo/MoreInfo'
import styles from './Section.module.css'
import { Fade } from 'react-awesome-reveal'

interface SectionProps {
  id: string
  title: string
  children: React.ReactElement
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className={styles.container__sections}>
      <Fade delay={300} duration={1000}>
        <h2>{title}</h2>
      </Fade>

      {children}

      <MoreInfo />
    </section>
  )
}

export default Section
