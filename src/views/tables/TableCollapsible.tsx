import React, { useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Users = () => {
  const [userData, setUserData] = useState<any[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
          }
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const toggleRowCollapse = (index: number) => {
    const newData = [...userData]
    newData[index].open = !newData[index].open
    setUserData(newData)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align='right'>Admin</TableCell>
            <TableCell align='right'>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row, index) => (
            <Fragment key={row.id}>
              <TableRow>
                <TableCell>
                  <IconButton aria-label='expand row' size='small' onClick={() => toggleRowCollapse(index)}>
                    {row.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align='right'>{row.is_admin ? 'Yes' : 'No'}</TableCell>
                <TableCell align='right'>{row.created_at}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                  <Collapse in={row.open} timeout='auto' unmountOnExit>
                    <Box margin={1}>
                      <Typography variant='h6' gutterBottom component='div'>
                        Services
                      </Typography>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Service ID</TableCell>
                            <TableCell>Usage</TableCell>
                            <TableCell>Expiry Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.service &&
                            row.service.map((service: any) => (
                              <TableRow key={service.id}>
                                <TableCell>{service.service_id}</TableCell>
                                <TableCell>{service.usage}</TableCell>
                                <TableCell>{service.expiry_date}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
