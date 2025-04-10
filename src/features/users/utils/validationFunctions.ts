import { UseField } from '../../../common/hooks/useField'

export interface ValidationTextProps {
  inputProps: UseField['inputProps']
  regexToValidate?: RegExp
  minLength?: number
  maxLength?: number
  errorMessage?: string
}

export const validationText = ({
  inputProps,
  regexToValidate,
  minLength,
  maxLength,
  errorMessage,
}: ValidationTextProps): string => {
  if (regexToValidate && errorMessage) {
    if (!regexToValidate.test(inputProps.value.toString())) {
      return errorMessage
    }
  }

  if (maxLength) {
    if (inputProps.value.toString().length < maxLength) {
      return `No debe sobrepasar los ${maxLength} caracteres`
    }
  }

  if (minLength) {
    if (inputProps.value.toString().length < minLength) {
      return `Debe tener mínimo ${minLength} caracteres`
    }
  }

  return ''
}
