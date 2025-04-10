import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import DirectionsIcon from '@mui/icons-material/Directions'
import EmailIcon from '@mui/icons-material/Email'
import LanguageIcon from '@mui/icons-material/Language'
import styles from '../CompanyProfile/CompanyProfile.module.css'
import { CompanyServiceType } from '../../../types/CompanyServiceType'
import { LanguageState } from '../../../../../common/types/LanguageState'
import { changeLanguageActionsCompanies } from '../../../utils/changeLanguageActionsCompanies'
import { useLanguageSelected } from '../../../../../common/hooks/useLanguages'

const InfoCompanyCard: React.FC<{
  company: CompanyServiceType
  text: LanguageState['companyProfile']
}> = ({ company, text }) => {
  const { idioma } = useLanguageSelected()

  return (
    <Card className={styles.card__info}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MovieIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={text.principalActivity}
            secondary={changeLanguageActionsCompanies(
              idioma,
              company.firstActivity,
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalMoviesIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={text.secondActivity}
            secondary={
              company.secondActivity
                ? changeLanguageActionsCompanies(idioma, company.secondActivity)
                : ''
            }
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FmdGoodIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={text.city} secondary={company.city} />
          <ListItemText primary={text.province} secondary={company.province} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DirectionsIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={text.direction}
            secondary={company.direction}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={text.email} secondary={company.email} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LanguageIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.open(company.website, '__blank')
            }}
          >
            <ListItemText primary={text.website} secondary={company.website} />
          </span>
        </ListItem>
      </List>
    </Card>
  )
}

export default InfoCompanyCard
