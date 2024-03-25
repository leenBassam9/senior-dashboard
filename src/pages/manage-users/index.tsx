import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'

const ManageUsers = () => {
  const [showForm, setShowForm] = useState(false)

  const handleOpenForm = () => {
    setShowForm(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>Manage Users</Typography>
        <Typography variant='body2'>Full Control Over User Accounts</Typography>
      </Grid>
      <Grid item xs={12} textAlign='right'>
        <Button
          variant='contained'
          size='small'
          startIcon={<AddIcon />}
          style={{ margin: '10px' }}
          onClick={handleOpenForm}
        >
          Add User
        </Button>
        <Card>
          {/* <CardHeader title='Users' titleTypographyProps={{ variant: 'h6' }} /> */}
          {showForm ? <FormLayoutsBasic /> : <TableCollapsible />}
        </Card>
      </Grid>
    </Grid>
  )
}

export default ManageUsers
