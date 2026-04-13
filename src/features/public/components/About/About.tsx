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
        src="/images/information/infografia1.png"
        alt="Infografía"
      />
      <ImageSlider
        images={[
          '/images/information/ppt1/page1.png',
          '/images/information/ppt1/page2.png',
          '/images/information/ppt1/page3.png',
        ]}
        style={{ marginTop: 24 }}
      />
    </>
  )
}

export default About
