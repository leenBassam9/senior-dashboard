// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

const UserForm = () => {
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  interface AddState {
    name: string
    email: string
    password: string
    showPassword: boolean
  }
  const [formData, setFormData] = useState<AddState>({
    name: '',
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = (prop: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [prop]: event.target.value })
  }

  // const authToken = localStorage.getItem('token')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData.email)
    console.log(formData.password)
    event.preventDefault()
    fetch('http://127.0.0.1:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        return response.json()
      })
      .then((data: any) => {
        console.log(data)
        if (data.error != null) {
          throw new Error('invalid data')
        }

        //  localStorage.setItem('token', data.token)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Card>
      <CardHeader title='Add New User' titleTypographyProps={{ variant: 'h6', textAlign: 'left' }} />
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Name' value={formData.name} onChange={handleChange('name')} />{' '}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                helperText='You can use letters, numbers & periods'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={formData.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={formData.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {formData.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserForm
