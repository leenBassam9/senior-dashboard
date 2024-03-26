// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ServicesTable from 'src/views/tables/ServiceTable'
import { useState } from 'react'
import ServiceForm from 'src/views/form-layouts/ServiceForm'

const ManageServices = () => {
  const [showForm, setShowForm] = useState(false)

  const handleOpenForm = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
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
          style={{ margin: '10px' }}
          onClick={showForm ? handleCloseForm : handleOpenForm}
        >
          {showForm ? 'Cancel' : 'Add Service'}
        </Button>{' '}
        <Card>{showForm ? <ServiceForm /> : <ServicesTable />}</Card>
      </Grid>
    </Grid>
  )
}

export default ManageServices
