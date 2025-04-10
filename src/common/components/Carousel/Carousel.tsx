import { Carousel as BootstrapCarousel } from 'react-bootstrap'
import { useState } from 'react'
import { Typography } from '@mui/material'

export interface CarouselItemProps {
  src: string
  alt?: string
  title?: string
  description?: string
}
const CustomCarousel: React.FC<{ items: CarouselItemProps[] }> = ({
  items,
}) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <BootstrapCarousel
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      activeIndex={index}
      onSelect={handleSelect}
    >
      {items.map((item, index) => (
        <BootstrapCarousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.src}
            alt={item.alt || 'Slide image'}
          />
          <BootstrapCarousel.Caption>
            {item.title && (
              <Typography variant="h6" color="secondary">
                {item.title}
              </Typography>
            )}
            {item.description && <Typography>{item.description}</Typography>}
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  )
}

export default CustomCarousel
