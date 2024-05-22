// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert' // Corrected import here

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = () => {
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const [apiStatus, setApiStatus] = useState({
    loading: false,
    successMsg: '',
    errorMsg: ''
  })

  const handleChangePassword = async () => {
    setApiStatus({ ...apiStatus, loading: true })
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin_change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          password: values.newPassword,
          old_password: values.currentPassword,
          confirmation_password: values.confirmNewPassword
        })
      })

      const data = await response.json()
      if (response.ok) {
        setApiStatus({ loading: false, successMsg: data.message, errorMsg: '' })
        setValues({ ...values, newPassword: '', currentPassword: '', confirmNewPassword: '' })
      } else {
        throw new Error(data.message || 'Failed to change password')
      }
    } catch (error) {
      setApiStatus({ loading: false, successMsg: '', errorMsg: error.message })
    }
  }

  const handleCloseSnackbar = () => {
    setApiStatus({ ...apiStatus, successMsg: '', errorMsg: '' })
  }

  // Input change handlers
  const handleInputChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  // Toggle password visibility
  const handleClickShowPassword =
    (prop: 'showCurrentPassword' | 'showNewPassword' | 'showConfirmNewPassword') => () => {
      setValues({ ...values, [prop]: !values[prop] })
    }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleInputChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword('showCurrentPassword')}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    type={values.showNewPassword ? 'text' : 'password'}
                    onChange={handleInputChange('newPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword('showNewPassword')}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleInputChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword('showConfirmNewPassword')}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button
            variant='contained'
            sx={{ marginRight: 3.5 }}
            onClick={handleChangePassword}
            disabled={apiStatus.loading}
          >
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>

      <Snackbar open={!!apiStatus.successMsg} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          {apiStatus.successMsg}
        </Alert>
      </Snackbar>

      <Snackbar open={!!apiStatus.errorMsg} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
          {apiStatus.errorMsg}
        </Alert>
      </Snackbar>
    </form>
  )
}

export default TabSecurity
