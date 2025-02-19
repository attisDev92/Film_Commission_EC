import styles from '../CompanyProfile.module.css'

const VideoCompany: React.FC<{ plataform: string; urlVideo: string }> = ({
  plataform,
  urlVideo,
}) => {
  const getEmbedUrl = () => {
    if (plataform === 'YouTube') {
      const videoId = urlVideo.split('v=')[1]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (plataform === 'Vimeo') {
      const videoId = urlVideo.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    return null
  }

  const embedUrl = getEmbedUrl()
  console.log(embedUrl)

  if (!embedUrl) {
    return null
  }

  return (
    <div className={styles.video__container}>
      <iframe
        src={embedUrl}
        title="Video Player"
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoCompany
