import { Card, Chip, Divider, Stack, Typography } from '@mui/material'
import { LanguageState } from '../../../types'
import styles from '../CompanyProfile.module.css'

const ClientsListCard: React.FC<{
  clients: string[]
  text: LanguageState['companyProfile']
}> = ({ clients, text }) => {
  return (
    <>
      {clients && (
        <Card className={styles.clients}>
          <Typography variant="h6">{text.clients}: </Typography>
          <Divider />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            {clients.map((client, id) => (
              <Chip key={id} color="info" label={client.toUpperCase()} />
            ))}
          </Stack>
        </Card>
      )}
    </>
  )
}

export default ClientsListCard
