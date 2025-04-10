import { TextField } from '@mui/material'

interface TextInputProps {
  id: string
  label: string
  placeholder: string
  errorHelper?: string
  touchedHelper?: boolean
  helperText?: string
  type: string
  multiline?: boolean
  rows?: number
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  errorHelper,
  touchedHelper,
  helperText,
  type,
  multiline,
  rows,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      id={id}
      type={type}
      variant="outlined"
      label={label}
      placeholder={placeholder}
      error={touchedHelper && Boolean(errorHelper)}
      helperText={errorHelper ? touchedHelper && errorHelper : helperText}
      multiline={multiline}
      rows={rows}
      {...props}
    />
  )
}

export default TextInput
