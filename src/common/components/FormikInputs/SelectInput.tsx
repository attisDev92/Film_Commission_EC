import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material'

interface SelectInputProps {
  id: string
  label: string
  options: string[]
  onChange?: (e: SelectChangeEvent<unknown>) => void
  required?: boolean
  multiple?: boolean
  helperText?: string
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  required,
  multiple,
  onChange,
  helperText,
  ...props
}) => {
  return (
    <FormControl required={required} fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        id={id}
        labelId={`${id}-label`}
        label={label}
        multiple={multiple}
        onChange={onChange}
        {...props}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default SelectInput
