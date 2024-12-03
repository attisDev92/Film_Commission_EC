import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#2e363c',
    },
    secondary: {
      main: '#d1d7dc',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Helvetica', 'Cubano', 'Roboto'].join(','),
  },
})

export default theme
