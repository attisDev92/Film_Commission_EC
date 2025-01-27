import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { useGetProfile, useGetUser } from '../../../hooks/useUser'
import { UserProfile, User } from '../../../types'
import styles from './Profile.module.css'
import { ImageAspectRatio } from '@mui/icons-material'

const Profile = () => {
  const user: User | null = useGetUser()
  const userProfile: UserProfile | null = useGetProfile()
  console.log(user)
  console.log(userProfile)
  return (
    <Card className={styles.profileContainer}>
      <Typography variant="h4">
        {userProfile?.firstName} {userProfile?.lastName}
      </Typography>
      <Divider />
      <List className={styles.list}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageAspectRatio />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Tipo de identidicación"
            secondary={userProfile?.identificationType}
          />
          <ListItemText
            primary="Identidicación"
            secondary={userProfile?.identification}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageAspectRatio />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Ciudad de residencia"
            secondary={userProfile?.residenceCity}
          />
          <ListItemText
            primary="Nacionalidad"
            secondary={userProfile?.nationality}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageAspectRatio />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Correo electrónico" secondary={user?.email} />
          <ListItemText primary="Teléfono" secondary={userProfile?.cellPhone} />
        </ListItem>
      </List>
    </Card>
  )
}

export default Profile
