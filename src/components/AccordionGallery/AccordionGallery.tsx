import { useState } from 'react'
import styles from './AccordionGallery.module.css'
import { Avatar } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'

const AccordionGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [active, setActive] = useState<number>(0)
  const [activePopUp, setActivePopUp] = useState<boolean>(false)

  const handleToggle = (index: number) => setActive(index)

  return (
    <>
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
                  <span onClick={() => setActivePopUp(true)}>
                    <FullscreenIcon color="primary" />
                  </span>
                </Avatar>
              </div>
            </div>
          )
        })}
      </section>
      {activePopUp && (
        <div className={styles.popUp__container}>
          <div
            className={styles.close__button}
            onClick={() => setActivePopUp(false)}
          >
            <Avatar>
              <CloseFullscreenIcon color="primary" />
            </Avatar>
          </div>
          <img src={images[active]} />
        </div>
      )}
    </>
  )
}

export default AccordionGallery
