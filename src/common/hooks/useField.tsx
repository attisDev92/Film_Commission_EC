import React, { useState } from 'react'

type TypeProp = 'text' | 'number' | 'password'
type initialValue = string | number

export interface UseField {
  value: string | number
  reset: () => void
  inputProps: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number
    type: 'text' | 'number' | 'password'
  }
}

export const useField = (
  type: TypeProp = 'text',
  initialValue: initialValue = '',
): UseField => {
  const [value, setValue] = useState<string | number>(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    reset,
    inputProps: {
      value,
      type,
      onChange,
    },
  }
}
