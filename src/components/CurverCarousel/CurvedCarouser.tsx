import React, { useRef, useState, useEffect } from 'react'
import styles from './CurvedCarousel.module.css'

interface CurvedCarouselProps {
  images: string[]
  backgroundColor?: string
}

const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
  images,
  backgroundColor = '#16181b',
}) => {
  const viewportRef = useRef<HTMLOListElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const duplicatedImages = [...images, ...images, ...images]

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleScroll = () => {
      if (viewport.scrollLeft >= (viewport.scrollWidth / 3) * 2) {
        viewport.scrollLeft = viewport.scrollWidth / 3
      } else if (viewport.scrollLeft <= 0) {
        viewport.scrollLeft = (viewport.scrollWidth / 3) * 2
      }
    }

    viewport.addEventListener('scroll', handleScroll)
    return () => viewport.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (viewportRef.current?.offsetLeft || 0))
    setScrollLeft(viewportRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !viewportRef.current) return
    e.preventDefault()
    const x = e.pageX - (viewportRef.current.offsetLeft || 0)
    const walk = (x - startX) * 2 // Ajusta la velocidad del arrastre
    viewportRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section className={styles.carousel} style={{ backgroundColor }}>
      <ol
        className={styles.viewport}
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        tabIndex={1}
      >
        {duplicatedImages.map((image, index) => (
          <li key={index} className={styles.slide}>
            <div
              className={styles.snapper}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default CurvedCarousel
