import React from 'react'
import styles from './Incentives.module.css'

interface ImageContainerProps {
  imageSource: string
}

const ImageContainer: React.FC<ImageContainerProps> = ({ imageSource }) => {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={imageSource} alt="incentivos" />
    </div>
  )
}

export default ImageContainer
