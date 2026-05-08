import ImageSlider from '../../../../common/components/ImageSlider'
import { LanguageState } from '../../../../common/types/LanguageState'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'

const About = () => {
  const text: LanguageState = useLanguageSelected()

  return (
    <>
      <p style={{ padding: '2rem 5rem', display: 'block' }}>
        {text.principalDescription}
      </p>
      <img
        style={{ maxWidth: '90%', margin: 'auto' }}
        src={
          text.idioma === 'esp'
            ? '/images/information/es/infografia1.png'
            : '/images/information/en/infografia1.png'
        }
        alt="Infografía"
      />
      <ImageSlider
        images={
          text.idioma === 'esp'
            ? [
                '/images/information/es/ppt1/page1.png',
                '/images/information/es/ppt1/page2.png',
                '/images/information/es/ppt1/page3.png',
              ]
            : [
                '/images/information/en/ppt1/page1.png',
                '/images/information/en/ppt1/page2.png',
                '/images/information/en/ppt1/page3.png',
              ]
        }
        style={{ marginTop: 24 }}
      />
    </>
  )
}

export default About
