//import { useNavigate } from 'react-router-dom'
import styles from './Location.module.css'
import { LanguageState } from '../../../../common/types/LanguageState'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import Carousel from '../../../../common/components/Carousel/Carousel'
import { CarouselItemProps } from '../../../../common/components/Carousel/Carousel'
import img1 from '../../../../assets/images/locations/106Sierra.jpg'
import img2 from '../../../../assets/images/locations/108NarizdelDiablo.jpg'
import img3 from '../../../../assets/images/locations/114Quito.jpg'
import img4 from '../../../../assets/images/locations/115Playa.jpg'
import img5 from '../../../../assets/images/locations/116Seleccion2UIO.jpg'
import img6 from '../../../../assets/images/locations/14Chimborazo.jpg'
import img7 from '../../../../assets/images/locations/22DesiertodePalmira.jpg'
import img8 from '../../../../assets/images/locations/30ExAeropuertodeUIO.jpg'
import img9 from '../../../../assets/images/locations/50Quilotoa.jpg'
import img10 from '../../../../assets/images/locations/85Seleccion2Cuenca.jpg'
import { Fade } from 'react-awesome-reveal'
import ImageSlider from '../../../../common/components/ImageSlider'

const locationsCarousel: CarouselItemProps[] = [
  {
    src: img1,
    alt: 'Chimborazo',
    title: 'Chimborazo',
  },
  {
    src: img2,
    alt: 'Rieles de tren',
  },
  {
    src: img3,
    alt: 'Quito',
    title: 'Quito',
  },
  {
    src: img4,
    alt: 'Playa',
  },
  {
    src: img5,
    alt: 'Quito',
    title: 'Centro Histórico, Quito',
  },
  {
    src: img6,
    alt: 'Cotopaxi',
    title: 'Cotopaxi',
  },
  {
    src: img7,
    alt: 'Desierto de Plamira',
    title: 'Desierto de Plamira',
  },
  {
    src: img8,
    alt: 'Antiguo Aeropuerto Mariscal Sucre',
    title: 'Antiguo Aeropuerto Mariscal Sucre',
  },
  {
    src: img9,
    alt: 'Laguna del Quilotoa',
    title: 'Laguna del Quilotoa',
  },
  {
    src: img10,
    alt: 'Catedral de Cuenca',
    title: 'Catedral de Cuenca',
  },
]

const Locations: React.FC = () => {
  //const navigate = useNavigate()
  const text: LanguageState = useLanguageSelected()

  const paragraph: string[] = text.locacionSeccion.parrafo.split('<br>')

  return (
    <>
      <div className={styles.locations}>
        <Fade cascade>
          {paragraph.map((text) => (
            <>
              <p>{text}</p>
              <br />
            </>
          ))}
        </Fade>
      </div>

      {/* Slider de locaciones tipo presentación */}
      <div style={{ margin: '2rem 0' }}>
        <ImageSlider
          images={[
            '/images/information/Locaciones/page1.png',
            '/images/information/Locaciones/page2.png',
            '/images/information/Locaciones/page3.png',
            '/images/information/Locaciones/page4.png',
            {
              src: '/images/information/Locaciones/page5.png',
              link: 'https://www.gob.ec/mae/tramites/emision-autorizacion-producciones-audiovisuales-caracter-comercial-informativo-educativo-documental-televisivo-areas-protegidas-subsistema-estatal',
            },
          ]}
        />
      </div>

      <div className={styles.carousel__container}>
        <Carousel items={locationsCarousel} />
      </div>

      {/* <button onClick={() => navigate('/locations')} className={styles.button}>
        {text.locacionSeccion.button}
      </button> */}
    </>
  )
}

export default Locations
