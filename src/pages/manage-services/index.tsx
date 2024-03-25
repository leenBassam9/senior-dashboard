// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableBasic from 'src/views/tables/TableBasic'

const manageservices = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>Manage Services</Typography>
        <Typography variant='body2'>Full Control Over Services </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Services' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic />
        </Card>
      </Grid>
    </Grid>
  )
}

export default manageservices
