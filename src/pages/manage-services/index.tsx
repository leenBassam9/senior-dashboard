// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TableBasic from 'src/views/tables/TableBasic'
import { useState } from 'react'
import ServiceForm from 'src/views/form-layouts/ServiceForm'

const ManageServices = () => {
  const [showForm, setShowForm] = useState(false)

  const handleOpenForm = () => {
    setShowForm(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>Manage Services</Typography>
        <Typography variant='body2'>Full Control Over Services </Typography>
      </Grid>

      <Grid item xs={12} textAlign='right'>
        <Button
          variant='contained'
          size='small'
          startIcon={<AddIcon />}
          style={{ margin: '10px' }}
          onClick={handleOpenForm}
        >
          Add Service
        </Button>
        <Card>
          {/* <CardHeader title='Users' titleTypographyProps={{ variant: 'h6' }} /> */}
          {showForm ? <ServiceForm /> : <TableBasic />}
        </Card>
      </Grid>
    </Grid>
  )
}

export default ManageServices
