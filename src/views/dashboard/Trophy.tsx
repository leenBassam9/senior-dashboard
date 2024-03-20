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
  const [monthlySales, setMonthlySales] = useState<number | null>(null)

  useEffect(() => {
    fetch('/mounthsellers')
      .then(response => response.json())
      .then(data => {
        setMonthlySales(data.sales)
      })
      .catch(error => {
        console.error('Error retrieving monthly sales:', error)
      })
  }, [])

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Congratulations! 🎉</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Best seller of the month
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {monthlySales ? `$${monthlySales.toFixed(1)}k` : 'Loading...'}
        </Typography>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default AchievementCard
