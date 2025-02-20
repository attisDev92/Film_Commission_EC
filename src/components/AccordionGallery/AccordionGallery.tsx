import { useState } from 'react'
import styles from './AccordionGallery.module.css'
import { Avatar } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

const AccordionGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [active, setActive] = useState<number>(0)

  const handleToggle = (index: number) => setActive(index)

  return (
    <section className={styles.image_accordion}>
      {images.map((image, index) => {
        const isActive = active === index ? 'active' : ''
        return (
          <div
            key={index}
            className={`${styles.image_accordion_item} ${isActive && styles.active}`}
            onClick={() => handleToggle(index)}
          >
            <img src={image} />
            <div className={styles.content}>
              <Avatar>
                <FullscreenIcon color="action" />
              </Avatar>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default AccordionGallery
