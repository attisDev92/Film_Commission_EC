import { useNavigate } from 'react-router-dom'
import CustomCarousel, {
  CarouselItemProps,
} from '../../../components/Carousel/Carousel'
import { useLanguageSelected } from '../../../hooks/useLanguages'
import { LanguageState } from '../../../types'
import styles from './Supplieres.module.css'
import service1 from '../../../assets/images/services/services1.jpg'
import service2 from '../../../assets/images/services/services2.jpg'

const carouselImages: CarouselItemProps[] = [
  {
    src: service1,
    alt: 'Film ProductionServices',
    title: 'Registra tu empresa dentro del catálogo',
    description: '',
  },
  {
    src: service2,
    alt: 'Film ProductionServices',
    title: 'Da a conocer tus servicios como proveedor audiovisual',
    description: '',
  },
]

const Suppliers = () => {
  const text: LanguageState = useLanguageSelected()
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <p>{text.suppliersSection.parrafo}</p>
      <CustomCarousel items={carouselImages} />
      <div>
        <p>{text.suppliersSection.message}</p>
        <button onClick={() => navigate('/system')}>
          {text.suppliersSection.button}
        </button>
      </div>
    </div>
  )
}

export default Suppliers
