import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Navigation } from 'swiper/modules'

type ImageSlide = string | { src: string; link?: string }

interface ImageSliderProps {
  images: ImageSlide[]
  style?: React.CSSProperties
  className?: string
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  style,
  className,
}) => (
  <div className={className} style={style}>
    <Swiper navigation modules={[Navigation]}>
      {images.map((img, idx) => {
        const slide = typeof img === 'string' ? { src: img } : img
        const content = (
          <img
            src={slide.src}
            alt={`Página ${idx + 1}`}
            style={{
              width: '100%',
              borderRadius: 8,
              cursor: slide.link ? 'pointer' : undefined,
            }}
          />
        )
        return (
          <SwiperSlide key={idx}>
            {slide.link ? (
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                {content}
              </a>
            ) : (
              content
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  </div>
)

export default ImageSlider
