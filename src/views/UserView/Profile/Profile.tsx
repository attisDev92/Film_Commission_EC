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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DirectionsIcon from '@mui/icons-material/Directions'
import AttachEmailIcon from '@mui/icons-material/AttachEmail'

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
              <AssignmentIndIcon />
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
              <DirectionsIcon />
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
              <AttachEmailIcon />
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
