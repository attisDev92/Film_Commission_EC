import { useState } from 'react'
import ImageSlider from '../../../../common/components/ImageSlider'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import {
  LanguageState,
  PermissionAccordionItem,
} from '../../../../common/types/LanguageState'
import '../../../../../src/styles/accordion-responsive.css'

type PermissionImage = string | { src: string; link?: string }

const PermissionsAccordion = () => {
  const text: LanguageState = useLanguageSelected()
  const [open, setOpen] = useState<string | null>(null)

  const permissionsImages: Record<string, PermissionImage[]> =
    text.idioma === 'esp'
      ? {
          filmacion: [
            '/images/information/es/Permisos de filmacion/page1.png',
            '/images/information/es/Permisos de filmacion/page2.png',
            '/images/information/es/Permisos de filmacion/page3.png',
            '/images/information/es/Permisos de filmacion/page4.png',
          ],
          migracion: [
            '/images/information/es/Migracion/page1.png',
            '/images/information/es/Migracion/page2.png',
            '/images/information/es/Migracion/page3.png',
            '/images/information/es/Migracion/page4.png',
            '/images/information/es/Migracion/page5.png',
          ],
          equipos: [
            '/images/information/es/Ingreso de equipos/page1.png',
            {
              src: '/images/information/es/Ingreso de equipos/page2.png',
              link: 'https://www.comunicacion.gob.ec/filmacion-productoras-extranjeras/',
            },
            '/images/information/es/Ingreso de equipos/page3.png',
            '/images/information/es/Ingreso de equipos/page4.png',
          ],
          drones: [
            '/images/information/es/Ingreso de drones/page1.png',
            '/images/information/es/Ingreso de drones/page2.png',
            '/images/information/es/Ingreso de drones/page3.png',
            '/images/information/es/Ingreso de drones/page4.png',
            {
              src: '/images/information/es/Ingreso de drones/page5.png',
              link: 'https://www.aviacioncivil.gob.ec/normativa-uas-drones/',
            },
          ],
        }
      : {
          filmacion: [
            '/images/information/en/Permisos de filmacion/page1.png',
            '/images/information/en/Permisos de filmacion/page2.png',
            '/images/information/en/Permisos de filmacion/page3.png',
            '/images/information/en/Permisos de filmacion/page4.png',
          ],
          migracion: [
            '/images/information/en/Migracion/page1.png',
            '/images/information/en/Migracion/page2.png',
            '/images/information/en/Migracion/page3.png',
            '/images/information/en/Migracion/page4.png',
            '/images/information/en/Migracion/page5.png',
          ],
          equipos: [
            '/images/information/en/Ingreso de equipos/page1.png',
            {
              src: '/images/information/en/Ingreso de equipos/page2.png',
              link: 'https://www.comunicacion.gob.ec/filmacion-productoras-extranjeras/',
            },
            '/images/information/en/Ingreso de equipos/page3.png',
            '/images/information/en/Ingreso de equipos/page4.png',
          ],
          drones: [
            '/images/information/en/Ingreso de drones/page1.png',
            '/images/information/en/Ingreso de drones/page2.png',
            '/images/information/en/Ingreso de drones/page3.png',
            '/images/information/en/Ingreso de drones/page4.png',
            {
              src: '/images/information/en/Ingreso de drones/page5.png',
              link: 'https://www.aviacioncivil.gob.ec/normativa-uas-drones/',
            },
          ],
        }

  return (
    <div className="accordion-responsive">
      {text.permissionsSection.permissions.map(
        (perm: PermissionAccordionItem) => (
          <div key={perm.key} className="accordion-incentive-item">
            <button
              className={`accordion-incentive-btn${open === perm.key ? ' open' : ''}`}
              onClick={() => setOpen(open === perm.key ? null : perm.key)}
              type="button"
            >
              <span className="accordion-incentive-title">{perm.titulo}</span>
              <span className="accordion-incentive-arrow">
                {open === perm.key ? '▲' : '▼'}
              </span>
            </button>
            {open === perm.key && (
              <div className="accordion-incentive-panel">
                <ImageSlider images={permissionsImages[perm.key]} />
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}

export default PermissionsAccordion
