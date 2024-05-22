import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  stats: number | null
  title: string
  color: ThemeColor
  icon: React.ReactNode
}

const salesData: DataType[] = [
  {
    stats: null,
    title: 'Users',
    color: 'info',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: null,
    title: 'Services',
    color: 'warning',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const StatisticsCard = () => {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [serviceCount, setServiceCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users_count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserCount(data)
      })
      .catch(error => {
        console.error('Error retrieving User Count:', error)
      })

    fetch('http://127.0.0.1:8000/api/services_count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/api',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setServiceCount(data)
      })
      .catch(error => {
        console.error('Error retrieving Service Count:', error)
      })
  }, [])
  const renderStats = () => {
    return salesData.map((item: DataType, index: number) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            {item.title === 'Users' ? userCount : serviceCount}
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total growth this month 😎
            </Box>{' '}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
