//import { useNavigate } from 'react-router-dom'
import styles from './Location.module.css'
import { LanguageState } from '../../../types'
import { useLanguageSelected } from '../../../hooks/useLanguages'

const Locations: React.FC = () => {
  //const navigate = useNavigate()
  const text: LanguageState = useLanguageSelected()

  const paragraph: string[] = text.locacionSeccion.parrafo.split('<br>')

  return (
    <>
      <div className={styles.locations}>
        {paragraph.map((text) => (
          <>
            <p>{text}</p>
            <br />
          </>
        ))}
      </div>

      {/* <button onClick={() => navigate('/locations')} className={styles.button}>
        {text.locacionSeccion.button}
      </button> */}
    </>
  )
}

export default Locations
