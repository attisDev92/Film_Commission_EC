import { useState } from 'react'
import { ImageList, ImageListItem, Modal, Box } from '@mui/material'
import styles from './PhotoGallery.module.css'

interface PhotoGalleryProps {
  photos: string[]
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  if (!photos || photos.length === 0) {
    return null
  }

  return (
    <div className={styles.galleryContainer}>
      <ImageList cols={3} gap={8}>
        {photos.map((photo, index) => (
          <ImageListItem key={index} onClick={() => handleImageClick(photo)}>
            <img
              src={photo}
              alt={`Location photo ${index + 1}`}
              loading="lazy"
              className={styles.galleryImage}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        className={styles.modal}
      >
        <Box className={styles.modalContent}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full screen"
              className={styles.fullScreenImage}
            />
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default PhotoGallery
