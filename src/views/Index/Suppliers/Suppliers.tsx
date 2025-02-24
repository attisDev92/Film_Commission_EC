import { useNavigate } from 'react-router-dom'
import { useLanguageSelected } from '../../../hooks/useLanguages'
import { LanguageState } from '../../../types'
import styles from './Supplieres.module.css'
import service1 from '../../../assets/images/services/services1.jpg'
import service2 from '../../../assets/images/services/film-team.jpg'
import SimpleParalax from 'simple-parallax-js'

const Suppliers = () => {
  const text: LanguageState = useLanguageSelected()
  const navigate = useNavigate()
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.background}>
          <SimpleParalax scale={1.5} delay={4.7}>
            <img src={service1} />
          </SimpleParalax>
        </div>
        <div className={styles.content}>
          <p>{text.suppliersSection.parrafo}</p>
          <button onClick={() => navigate('/companies')}>
            {text.menu.AVServices}
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.background}>
          <SimpleParalax scale={1.5} delay={4.7}>
            <img src={service2} />
          </SimpleParalax>
        </div>
        <div className={`${styles.content} ${styles.right}`}>
          <p>{text.suppliersSection.message}</p>
          <button onClick={() => navigate('/system')}>
            {text.suppliersSection.button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Suppliers
