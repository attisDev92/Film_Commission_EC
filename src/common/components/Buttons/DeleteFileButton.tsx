import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Button from '@mui/material/Button'

interface UploadButtonProps {
  loading: boolean
  success: boolean
  label: string
  handleClick?: () => void
  type: 'button' | 'submit' | 'reset'
}

const DeleteButton: React.FC<UploadButtonProps> = ({
  success,
  loading,
  label,
  handleClick,
}) => {
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading}
        onClick={handleClick}
      >
        {label}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  )
}

export default DeleteButton
