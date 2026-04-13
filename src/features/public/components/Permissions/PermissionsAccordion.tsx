import { useState } from 'react'
import ImageSlider from '../../../../common/components/ImageSlider'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import {
  LanguageState,
  PermissionAccordionItem,
} from '../../../../common/types/LanguageState'

const permissionsImages: Record<string, string[]> = {
  filmacion: [
    '/images/information/Permisos de filmacion/page1.png',
    '/images/information/Permisos de filmacion/page2.png',
    '/images/information/Permisos de filmacion/page3.png',
    '/images/information/Permisos de filmacion/page4.png',
    '/images/information/Permisos de filmacion/page5.png',
  ],
  migracion: [
    '/images/information/Migracion/page1.png',
    '/images/information/Migracion/page2.png',
    '/images/information/Migracion/page3.png',
    '/images/information/Migracion/page4.png',
    '/images/information/Migracion/page5.png',
  ],
  equipos: [
    '/images/information/Ingreso de equipos/page1.png',
    '/images/information/Ingreso de equipos/page2.png',
    '/images/information/Ingreso de equipos/page3.png',
    '/images/information/Ingreso de equipos/page4.png',
  ],
  drones: [
    '/images/information/Ingreso de drones/page1.png',
    '/images/information/Ingreso de drones/page2.png',
    '/images/information/Ingreso de drones/page3.png',
    '/images/information/Ingreso de drones/page4.png',
    '/images/information/Ingreso de drones/page5.png',
  ],
}

const PermissionsAccordion = () => {
  const text: LanguageState = useLanguageSelected()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div>
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
