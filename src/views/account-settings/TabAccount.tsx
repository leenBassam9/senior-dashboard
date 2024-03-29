import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import { apiService } from 'src/api/api-service' // Make sure this path matches your project structure
import { User } from 'src/api/schemas/user' // Make sure this path matches your project structure

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const TabAccount = () => {
  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    is_admin: false,
    created_at: '',
    id: -1
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      apiService
        .getUsers()
        .then(users => {
          const user = users.find(user => user.id.toString() === userId)
          if (user) setUserData(user)
        })
        .catch(console.error)
    }
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: event.target.value })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (userData.id >= 0) {
      apiService
        .updateUser(userData.id, {
          name: userData.name,
          email: userData.email
        })
        .then(() => {
          setSnackbarMessage('User updated successfully')
          setOpenSnackbar(true)
        })
        .catch(error => {
          console.error('Error updating user:', error)
          setSnackbarMessage('Failed to update user')
          setOpenSnackbar(true)
        })
    }
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={'/images/avatars/1.png'} alt='Profile Pic' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              placeholder='Name'
              value={userData.name}
              onChange={handleNameChange}
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='Email'
              value={userData.email}
              onChange={handleEmailChange}
              margin='normal'
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
    </CardContent>
  )
}

export default TabAccount
