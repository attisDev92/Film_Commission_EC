import React from 'react'
import styles from './RegisterProject.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Divider, Typography, Button } from '@mui/material'
import InputStills from './components/InputStills'
import { useUserProjects } from '../../../hooks/useAudiovsiualProjects'
import InputPhotoDirector from './components/InputPhotoDirector'
import InputPhotoProducer from './components/InputPhotoProducer'
import InputAfiche from './components/InputAfiche'
import InputDossier from './components/InputDossier'

const ProjectFiles: React.FC = () => {
  const navigate = useNavigate()
  const projectId = useParams().id || ''
  const { project } = useUserProjects(projectId)

  return (
    <Card className={styles.card}>
      <Typography variant="h4">Edición de imágenes</Typography>
      <Divider />
      <InputAfiche projectId={projectId} afiche={project?.afiche || {}} />
      <Divider />
      <InputPhotoDirector
        projectId={projectId}
        directorPhoto={project?.directorPhoto || {}}
      />
      <Divider />
      <InputPhotoProducer
        projectId={projectId}
        producerPhoto={project?.producerPhoto || {}}
      />
      <Divider />
      <InputStills projectId={projectId} stills={project?.stills || []} />
      <Divider />
      <InputDossier projectId={projectId} dossier={project?.dossier || {}} />
      <Divider />
      <Typography>
        Si ha completado la edición de las imagenes, o ya no desea realizar
        algúun cambio puede regresar al perfil
      </Typography>
      <Button variant="contained" onClick={() => navigate('/system')}>
        Regresar al perfil
      </Button>
    </Card>
  )
}

export default ProjectFiles
