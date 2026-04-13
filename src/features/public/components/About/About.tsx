import ImageSlider from '../../../../common/components/ImageSlider'

const About = () => {
  return (
    <>
      <img
        src="src/assets/images/information/infografia1.png"
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
