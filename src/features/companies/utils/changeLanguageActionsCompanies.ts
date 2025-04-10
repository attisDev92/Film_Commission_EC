export const changeLanguageActionsCompanies = (
  idioma: string,
  action: string,
): string => {
  if (idioma === 'eng') {
    switch (action) {
      case 'Producción':
        return 'Production'
      case 'Animación':
        return 'Animation'
      case 'Postproducción':
        return 'Post-production'
      case 'Sonido / Diseño de Sonido':
        return 'Sound design'
      case 'Desarrollo de Videojuegos':
        return 'Video game development'
      default:
        return 'Rental'
    }
  }

  return action
}
