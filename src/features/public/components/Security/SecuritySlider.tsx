import ImageSlider from '../../../../common/components/ImageSlider'

const securityImages = [
  '/images/information/Seguridad/page1.png',
  '/images/information/Seguridad/page2.png',
  '/images/information/Seguridad/page3.png',
]

const SecuritySlider = () => (
  <div style={{ margin: '2rem 0' }}>
    <ImageSlider images={securityImages} />
  </div>
)

export default SecuritySlider
