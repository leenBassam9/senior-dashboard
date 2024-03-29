import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { serviceApi } from 'src/api/service-api' // Ensure correct import path
import { Service } from 'src/api/schemas/service' // Ensure correct import path

const ServiceTable = () => {
  const [serviceData, setServiceData] = useState<Service[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteServiceId, setDeleteServiceId] = useState<number | null>(null)
  const [editServiceData, setEditServiceData] = useState<Service>({
    id: -1,
    name: '',
    description: '',
    price: 0,
    usage: 0,
    expiry_date: ''
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    fetchServiceData()
  }, [])

  const fetchServiceData = () => {
    serviceApi.onServicesUpdated.subscribe(setServiceData)
    serviceApi.getService().then(setServiceData).catch(console.log)
  }
  const handleDeleteClick = (serviceId: number) => {
    setDeleteServiceId(serviceId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteService = () => {
    if (deleteServiceId !== null) {
      serviceApi
        .deleteService(deleteServiceId)
        .then(() => {
          fetchServiceData()
          setIsDeleteDialogOpen(false)
        })
        .catch(console.log)
    }
  }

  const handleEditClick = (service: Service) => {
    setEditServiceData(service)
    setIsEditModalOpen(true)
  }

  const updateService = () => {
    if (editServiceData.id >= 0) {
      serviceApi
        .updateService(editServiceData.id, editServiceData)
        .then(() => {
          setIsEditModalOpen(false)
          fetchServiceData()
        })
        .catch(console.log)
    }
  }

  return (
    <>
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
              <TableRow key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='left'>{row.description}</TableCell>
                <TableCell align='left'>{row.price}</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label='edit' onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label='delete' onClick={() => handleDeleteClick(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this service?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteService} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Editing Dialog */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            value={editServiceData.name}
            onChange={e => setEditServiceData({ ...editServiceData, name: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            value={editServiceData.description}
            onChange={e => setEditServiceData({ ...editServiceData, description: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Price'
            type='number'
            fullWidth
            variant='standard'
            value={editServiceData.price}
            onChange={e => setEditServiceData({ ...editServiceData, price: parseInt(e.target.value, 10) || 0 })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={updateService}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ServiceTable
