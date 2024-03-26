import React, { ChangeEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:8000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Add New User' titleTypographyProps={{ variant: 'h6', textAlign: 'left' }} />
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Name' name='name' value={formData.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='price'>Price</InputLabel>
                <OutlinedInput id='price' name='price' value={formData.price} onChange={handleChange} type='number' />
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

export default ServiceForm
