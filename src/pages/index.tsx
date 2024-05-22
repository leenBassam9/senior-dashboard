import Grid from '@mui/material/Grid'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem('token')
    if (!authToken) {
      router.push('/pages/login')
    }
  }, [router])

  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Trophy />
        </Grid>
        <Grid item xs={12}>
          <StatisticsCard />
        </Grid>

        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
