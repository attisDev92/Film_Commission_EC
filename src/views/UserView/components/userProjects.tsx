import { useState, useEffect } from 'react'
import { Card, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/Image'
import PreviewIcon from '@mui/icons-material/Preview'
import { useNavigate } from 'react-router-dom'
import { useUserProjects } from '../../../hooks/useAudiovsiualProjects'
import styles from './UserCards.module.css'
import { AppDispatch } from '../../../Redux/store'
import { deleteProject } from '../../../Redux/audiovisualProjectReducer'
import { setNotification } from '../../../Redux/notificationReducer'
import { AudiovisualProject } from '../../../types'
import { useDispatch } from 'react-redux'

const UserProjects: React.FC = () => {
  const { audiovisualProjects } = useUserProjects()
  const navigate = useNavigate()
  const [rows, setRows] = useState<AudiovisualProject[]>(audiovisualProjects)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setRows(audiovisualProjects)
  }, [audiovisualProjects])

  const handleDeleteProjectes = async (id: string) => {
    try {
      const response = await dispatch(deleteProject(id))
      if (response.success) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))

        dispatch(
          setNotification({
            style: 'success',
            text: 'Elemento eliminado correctamente',
          }),
        )
      }
    } catch (error: unknown) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: 'Error al eliminar el elemento',
        }),
      )
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    {
      field: 'director',
      headerName: 'Director',
      width: 100,
    },
    {
      field: 'producer',
      headerName: 'Productor',
      width: 100,
    },
    {
      field: 'productionCompany',
      headerName: 'Empresa Productora',
      width: 150,
    },
    {
      field: 'genre',
      headerName: 'Género',
      width: 100,
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
              window.open(`https://cinemaec.com/projects/${id}`, '_blank')
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
            onClick={() => navigate(`/system/projects/edit/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ImageIcon />}
            label="Editar Imagenes"
            className="textPrimary"
            onClick={() => navigate(`/system/projects/files/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            className="textPrimary"
            onClick={() => handleDeleteProjectes(id.toString())}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">
          Proyectos Work in Progress del usuario
        </Typography>
        {audiovisualProjects && audiovisualProjects.length > 0 ? (
          <DataGrid rows={rows} columns={columns} editMode="row" />
        ) : (
          <Typography variant="body1">
            No tiene registrado ningún proyecto audiovisual.
          </Typography>
        )}
      </Card>
    </>
  )
}

export default UserProjects
