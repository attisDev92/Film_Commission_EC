import { Button } from '@mui/material'

interface EditButtonProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  onSave: () => void
}

const EditButton: React.FC<EditButtonProps> = ({
  isEdit,
  setIsEdit,
  onSave,
}) => {
  return (
    <>
      {!isEdit ? (
        <Button
          variant="contained"
          color="info"
          onClick={() => setIsEdit(true)}
        >
          Editar
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsEdit(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={onSave}>
            Guardar
          </Button>
        </>
      )}
    </>
  )
}

export default EditButton
