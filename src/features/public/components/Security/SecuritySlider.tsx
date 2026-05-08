import ImageSlider from '../../../../common/components/ImageSlider'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'

type SecurityImage = string | { src: string; link?: string }

const SecuritySlider = () => {
  const text = useLanguageSelected()

  const securityImages: Record<string, SecurityImage[]> =
    text.idioma === 'esp'
      ? {
          security: [
            '/images/information/es/Seguridad/page1.png',
            '/images/information/es/Seguridad/page2.png',
            '/images/information/es/Seguridad/page3.png',
          ],
        }
      : {
          security: [
            '/images/information/en/Seguridad/page1.png',
            '/images/information/en/Seguridad/page2.png',
            '/images/information/en/Seguridad/page3.png',
          ],
        }

  return (
    <div style={{ margin: '2rem 0' }}>
      <ImageSlider images={securityImages.security} />
    </div>
  )
}

export default SecuritySlider
