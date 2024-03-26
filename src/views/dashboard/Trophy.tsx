import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const AchievementCard = () => {
  const theme = useTheme()
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

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Congratulations! 🎉</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Total Usage of the month
        </Typography>
        <Typography variant='h5' sx={{ my: 2 }}>
          {monthlyUsage !== null ? monthlyUsage : 'Loading...'} !
        </Typography>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default AchievementCard
