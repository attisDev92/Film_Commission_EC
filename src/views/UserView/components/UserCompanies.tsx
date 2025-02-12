import { Button, Card, Divider, Typography } from '@mui/material'
import { useUserCompanies } from '../../../hooks/useCompanies'
import { useNavigate } from 'react-router-dom'
import styles from './UserCards.module.css'

const UserCompanies: React.FC = () => {
  const navigate = useNavigate()
  const { companies } = useUserCompanies()
  console.log(companies)

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">Empresas de servicios del usuario</Typography>
        <Divider />
        {companies && companies.length > 0 ? (
          <>
            {companies.map((company) => (
              <>
                <Typography variant="h6">{company.company}</Typography>
                <Typography variant="body2">
                  {company.province} | {company.city}
                </Typography>
                <Typography variant="body1">
                  {company.firstActivity} | {company.secondActivity}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/system/locations/${company.id}`)}
                >
                  Ver empresa
                </Button>
                <Divider />
              </>
            ))}
          </>
        ) : (
          <>
            <Typography variant="body1">
              No tiene registrada ninguna empresa de servicio audiovisual.
            </Typography>
          </>
        )}
      </Card>
    </>
  )
}

export default UserCompanies
