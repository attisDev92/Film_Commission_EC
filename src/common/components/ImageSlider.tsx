import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

interface ImageSliderProps {
  images: string[]
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
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`Página ${idx + 1}`}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)

export default ImageSlider
