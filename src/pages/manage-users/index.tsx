import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import UsersTable from 'src/views/tables/UserTable'
import Button from '@mui/material/Button'
import UserForm from 'src/views/form-layouts/UserForm'

const ManageUsers = () => {
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
        <Typography variant='h5'>Manage Users</Typography>
        <Typography variant='body2'>Full Control Over User Accounts</Typography>
      </Grid>
      <Grid item xs={12} textAlign='right'>
        <Button
          variant='contained'
          size='small'
          style={{ margin: '10px' }}
          onClick={showForm ? handleCloseForm : handleOpenForm}
        >
          {showForm ? 'Cancel' : 'Add User'}
        </Button>
        <Card>{showForm ? <UserForm /> : <UsersTable />}</Card>
      </Grid>
    </Grid>
  )
}

export default ManageUsers
