import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import leftArrow from '/assets/images/Icon-left-arrow.png'
import rightArrow from '/assets/images/Icon-right-arrow.png'
import styles from './SliderImages.module.css'
import imagesDataLocations from '../../data/data_img_locations.json'

const SliderImages = () => {
  const [currentImg, setCurrentImg] = useState(0)
  const [prevImg, setPrevImg] = useState(0)
  const [nextImg, setNextImg] = useState(0)
  const [selectedImagesData, setSelectedImagesData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const allImagesData =
      text.idioma === 'esp'
        ? imagesDataLocations.español
        : imagesDataLocations.english

    const copyAllImages = [...allImagesData]
    let randomImages = []

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * copyAllImages.length)
      const imageRandom = copyAllImages.splice(randomIndex, 1)[0]
      randomImages.push(imageRandom)
    }

    setSelectedImagesData(randomImages)
    updateImages(0)
  }, [])

  const updateImages = (index) => {
    const prevIndex = index === 0 ? selectedImagesData.length - 1 : index - 1

    setPrevImg(prevIndex)

    const nextIndex = index === selectedImagesData.length - 1 ? 0 : index + 1

    setNextImg(nextIndex)
  }

  const handleNextImage = () => {
    const nextIndex =
      currentImg + 1 === selectedImagesData.length ? 0 : currentImg + 1

    setCurrentImg(nextIndex)
    updateImages(nextIndex)
  }

  const handlePreviousImage = () => {
    const previousIndex =
      currentImg === 0 ? selectedImagesData.length - 1 : currentImg - 1

    setCurrentImg(previousIndex)
    updateImages(previousIndex)
  }

  const handleOnClick = () => {
    navigate('/locations')
  }

  return (
    <div className={styles.slider}>
      <div className={styles.banner}>
        <button onClick={handlePreviousImage} className={styles.card__img}>
          <div className={styles.image__box}>
            {selectedImagesData[prevImg] && (
              <img
                loading="lazy"
                src={`/assets/images/${selectedImagesData[prevImg].src}`}
                alt={selectedImagesData[currentImg].name}
              />
            )}
          </div>
          <div className={`${styles.arrows} ${styles.arrows__left}`}>
            <img src={leftArrow} alt="Left Arrow" />
          </div>
        </button>

        <div className={`${styles.card__img} ${styles.card__principal}`}>
          <div className={styles.image__box}>
            {selectedImagesData[currentImg] && (
              <img
                loading="lazy"
                src={`/assets/images/${selectedImagesData[currentImg].src}`}
                alt={selectedImagesData[currentImg].name}
              />
            )}
          </div>
          <div className={styles.card__box}>
            <h4>{selectedImagesData[currentImg]?.name}</h4>
            <p>{selectedImagesData[currentImg]?.location} - Ecuador</p> <br />
            <a onClick={handleOnClick}>
              {text.idioma === 'esp' ? 'ver más locaciones' : 'more locations'}
            </a>
          </div>
        </div>

        <button onClick={handleNextImage} className={styles.card__img}>
          <div className={styles.image__box}>
            {selectedImagesData[nextImg] && (
              <img
                loading="lazy"
                src={`/assets/images/${selectedImagesData[nextImg].src}`}
                alt={selectedImagesData[currentImg].name}
              />
            )}
          </div>
          <div className={`${styles.arrows} ${styles.arrows__right}`}>
            <img src={rightArrow} alt="Right Arrow" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default SliderImages
