import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface SelectInputProps {
  id: string
  label: string
  options: string[]
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void
  required?: boolean
  multiple?: boolean
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  required,
  multiple,
  onChange,
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
    </FormControl>
  )
}

export default SelectInput
