import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/Image'
import PreviewIcon from '@mui/icons-material/Preview'
import { useUserLocations } from '../../../hooks/useLocations'
import styles from './UserCards.module.css'
import { LocationTypes } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { deleteLocation } from '../../../Redux/locationReducer'
import { setNotification } from '../../../Redux/notificationReducer'

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
      await dispatch(deleteLocation(id))
      setRows((prevRows) => prevRows.filter((row) => row.id !== id))
      dispatch(
        setNotification({
          style: 'success',
          text: 'Locación eliminada correctamente',
        }),
      )
    } catch (error: unknown) {
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
    { field: 'name', headerName: 'Nombre', width: 200 },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 150,
    },
    {
      field: 'province',
      headerName: 'Provincia',
      width: 150,
    },
    {
      field: 'city',
      headerName: 'Ciudad',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 200,
    },
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
      width: 150,
      headerName: 'Edición',
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
            label="Editar Imágenes"
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
  )
}

export default UserLocations
