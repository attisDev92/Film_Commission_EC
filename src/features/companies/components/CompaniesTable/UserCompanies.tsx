import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/Image'
import PreviewIcon from '@mui/icons-material/Preview'
import { useUserCompanies } from '../../../companies/hooks/useCompanies'
import styles from './UserCompanies.module.css'
import { CompanyServiceType } from '../../../companies/types/CompanyServiceType'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { deleteCompany } from '../../slices/deleteCompany'
import { setNotification } from '../../../../app/store/slices/setNotification'

const UserCompanies: React.FC = () => {
  const { companies } = useUserCompanies()
  const navigate = useNavigate()
  const [rows, setRows] = useState<CompanyServiceType[]>(companies)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setRows(companies)
  }, [companies])

  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await dispatch(deleteCompany(id))

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
    { field: 'company', headerName: 'Nombre', width: 200 },
    {
      field: 'firstActivity',
      headerName: 'Actividad',
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
              window.open(`${window.location.origin}/companies/${id}`, '_blank')
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
            onClick={() => navigate(`/system/services/edit/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ImageIcon />}
            label="Editar Imagenes"
            className="textPrimary"
            onClick={() => navigate(`/system/services/files/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            className="textPrimary"
            onClick={() => handleDeleteCompany(id.toString())}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">Empresas de servicios del usuario</Typography>
        {companies && companies.length > 0 ? (
          <DataGrid rows={rows} columns={columns} editMode="row" />
        ) : (
          <Typography variant="body1">
            No tiene registrada ninguna empresa de servicio audiovisual.
          </Typography>
        )}
      </Card>
    </>
  )
}

export default UserCompanies
