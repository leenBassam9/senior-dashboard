import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

interface DataType {
  stats: number | null
  title: string
  color: ThemeColor
  icon: React.ReactNode
}

const salesData: DataType[] = [
  {
    stats: null,
    title: 'Sales',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: null,
    title: 'Customers',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
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
  const [monthlyUsage, setMonthlyUsage] = useState<number | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const authToken = localStorage.getItem('token')
    setToken(authToken)
  }, [])

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/api/services_total_usage', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          const totalUsage = parseInt(data.total_usage)
          setMonthlyUsage(totalUsage)
        })
        .catch(error => {
          console.error('Error retrieving monthly usage:', error)
        })
    }
  }, [token])

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
            {monthlyUsage !== null ? monthlyUsage : 'Loading...'} !
            <Typography variant='h6'>{item.stats !== null ? item.stats : 'Loading...'}</Typography>
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
