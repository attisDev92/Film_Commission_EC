import React from 'react'
import MoreInfo from '../MoreInfo/MoreInfo'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  title: string
  children: React.ReactElement
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className={styles.container__sections}>
      <h2>{title}</h2>

      {children}

      <MoreInfo />
    </section>
  )
}

export default Section
