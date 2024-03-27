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
import DeleteIcon from '@mui/icons-material/Delete'
import { apiService } from 'src/api/api-service'

interface User {
  id: number
  name: string
  email: string
  is_admin: boolean
  created_at: string
  service?: Service[]
  open?: boolean
}

interface Service {
  service_name: string
  usage: number
  expiry_date: string
}

const UsersTable = () => {
  const [userData, setUserData] = useState<User[]>([])

  const fetchUserData = async () => {
    apiService.getUsers().then(setUserData).catch(console.log)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const toggleRowCollapse = (index: number) => {
    const newData = userData.map((user, idx) => (idx === index ? { ...user, open: !user.open } : user))
    setUserData(newData)
  }

  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const newData = userData.filter(user => user.id !== userId) // Remove deleted user from state
      setUserData(newData)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align='right'>is Admin</TableCell>
            <TableCell align='right'>Joined in</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user, index) => (
            <Fragment key={user.id}>
              <TableRow>
                <TableCell>
                  <IconButton aria-label='expand row' size='small' onClick={() => toggleRowCollapse(index)}>
                    {user.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align='right'>{user.is_admin ? 'Yes' : 'No'}</TableCell>
                <TableCell align='right'>{user.created_at.split('T')[0]}</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label='delete' size='small' onClick={() => deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={user.open} timeout='auto' unmountOnExit>
                    <Box margin={1}>
                      <Typography variant='h6' gutterBottom component='div'>
                        Services
                      </Typography>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Service name</TableCell>
                            <TableCell>Usage</TableCell>
                            <TableCell>Expiry Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.service &&
                            user.service.map(service => (
                              <TableRow key={service.service_name}>
                                <TableCell>{service.service_name}</TableCell>
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

export default UsersTable
