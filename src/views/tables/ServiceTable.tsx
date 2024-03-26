import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const ServiceTable = () => {
  const [serviceData, setServiceData] = useState<any[]>([])

  useEffect(() => {
    fetchServiceData()
  }, [])

  const fetchServiceData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/services', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setServiceData(data)
    } catch (error) {
      console.error('Error fetching service data:', error)
    }
  }

  const deleteService = async (serviceId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      fetchServiceData()
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Description</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceData.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='left'>{row.description}</TableCell>
              <TableCell align='left'>{row.price}</TableCell>
              <TableCell align='right'>
                <IconButton aria-label='delete' onClick={() => deleteService(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ServiceTable
