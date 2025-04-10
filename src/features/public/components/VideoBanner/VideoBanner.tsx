import styles from './VideoBanner.module.css'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import { LanguageState } from '../../../../common/types/LanguageState'

const VideoBanner: React.FC = () => {
  const text: LanguageState = useLanguageSelected()

  const videoUrlWebm: string = `/videos/${text.videoBanner.urlVideo}.webm`
  const videoUrlMp4: string = `/videos/${text.videoBanner.urlVideo}.mp4`

  return (
    <div className={styles.container__video}>
      <video className={styles.video} autoPlay loop controls muted>
        <source src={videoUrlWebm} type="video/webm" />
        <source src={videoUrlMp4} type="video/mp4" />
        Tu navegador no soporta la etiqueta de 'video'.
      </video>
    </div>
  )
}

export default VideoBanner
