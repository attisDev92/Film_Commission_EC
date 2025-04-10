import { Card, Typography } from '@mui/material'
import styles from './UserLocations.module.css'
import { useUserLocations } from '../../hooks/useLocations'
import { useEffect, useState } from 'react'
import { LocationTypes } from '../../types/LocationTypes'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../../app/store/store'
import { useDispatch } from 'react-redux'
import { deleteLocation } from '../../slices/deleteLocation'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/Image'
import PreviewIcon from '@mui/icons-material/Preview'

const UserLocations: React.FC = () => {
  const { locations } = useUserLocations()
  const navigate = useNavigate()
  const [rows, setRows] = useState<LocationTypes[]>(locations)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setRows(locations)
  }, [locations])

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await dispatch(deleteLocation(id))

      if (response.success) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))
      }

      dispatch(
        setNotification({
          style: 'success',
          text: 'Locación eliminada correctamente',
        }),
      )
    } catch (error) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: 'Error al eliminar la locación',
        }),
      )
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    {
      field: 'subcategory',
      headerName: 'Subcategoría',
      width: 150,
    },
    { field: 'province', headerName: 'Provincia', width: 150 },
    { field: 'city', headerName: 'Ciudad', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'address', headerName: 'Dirección', width: 200 },
    {
      field: 'preview',
      type: 'actions',
      width: 150,
      headerName: 'Previsualización',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<PreviewIcon />}
            label="Previsualizar"
            className="textPrimary"
            onClick={() =>
              window.open(`${window.location.origin}/locations/${id}`, '_blank')
            }
            color="inherit"
          />,
        ]
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar Información"
            className="textPrimary"
            onClick={() => navigate(`/system/locations/edit/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ImageIcon />}
            label="Editar Imagenes"
            className="textPrimary"
            onClick={() => navigate(`/system/locations/files/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            className="textPrimary"
            onClick={() => handleDeleteLocation(id.toString())}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">Locaciones del usuario</Typography>
        {locations && locations.length > 0 ? (
          <DataGrid rows={rows} columns={columns} editMode="row" />
        ) : (
          <Typography variant="body1">
            No tiene registrada ninguna locación.
          </Typography>
        )}
      </Card>
    </>
  )
}

export default UserLocations
