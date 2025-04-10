import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

interface BirthdateInputTypes {
  value: Dayjs
  onChange: (value: Dayjs | null) => void
}

const BirthdateInput: React.FC<BirthdateInputTypes> = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DateField
          label="Fecha de nacimiento"
          value={value}
          onChange={onChange}
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default BirthdateInput
