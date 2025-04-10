export type Areas = 'Urbano' | 'Rural' | 'Natural'

export type UrbanArea =
  | 'Moderno'
  | 'Histórico'
  | 'Residencial'
  | 'Parques y Plazas'
  | 'Deportivos'
  | 'Cultural'
  | 'Negocios y Comercios'

export type RuralArea = 'Pueblos' | 'Carreteras'

export type NaturalArea = 'Reservas Ecológicas' | 'Playas'

export const categories: Areas[] = ['Urbano', 'Rural', 'Natural']

export const subCategoryUrban: UrbanArea[] = [
  'Moderno',
  'Histórico',
  'Residencial',
  'Parques y Plazas',
  'Deportivos',
  'Cultural',
  'Negocios y Comercios',
]

export const subCategoryRural: RuralArea[] = ['Pueblos', 'Carreteras']

export const subCategoryNatural: NaturalArea[] = [
  'Reservas Ecológicas',
  'Playas',
]
