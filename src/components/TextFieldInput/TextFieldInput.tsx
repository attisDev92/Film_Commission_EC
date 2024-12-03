import { TextField } from '@mui/material'
import React, { useState } from 'react'
import {
  validationText,
  ValidationTextProps,
} from '../../Utils/validationFunctions'

interface TextFieldProps extends ValidationTextProps {
  name: string
  label: string
  required?: boolean
}

const TextInputField: React.FC<TextFieldProps> = ({
  name,
  label,
  inputProps,
  regexToValidate,
  minLength,
  maxLength,
  errorMessage,
  required,
}) => {
  const [error, setError] = useState<boolean>(false)
  const [helpMessage, setHelpMessage] = useState<string>('')

  const handleBlur = () => {
    if (regexToValidate || minLength || maxLength || errorMessage) {
      const validateError: string = validationText({
        inputProps,
        regexToValidate,
        minLength,
        maxLength,
        errorMessage,
      })
      setError(!!validateError)
      setHelpMessage(validateError || '')
    }
  }

  return (
    <TextField
      id={name}
      label={label}
      required={required}
      onBlur={handleBlur}
      error={error}
      helperText={helpMessage}
      {...inputProps}
      variant="filled"
    />
  )
}

export default TextInputField
