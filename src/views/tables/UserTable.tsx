import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { apiService } from "src/api/api-service"; // Adjust the import path as needed
import { User } from "src/api/schemas/user"; // Adjust the import path as needed

const UsersTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<User>({
    id: -1,
    name: "",
    email: "",
    is_admin: false,
    created_at: "",
    service: [],
    open: false,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    apiService.onUsersUpdated.subscribe(setUserData);
    apiService.getUsers().then(setUserData).catch(console.log);
  };
  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (deleteUserId !== null) {
      apiService
        .deleteUser(deleteUserId)
        .then(() => {
          fetchUserData();
          setIsDeleteDialogOpen(false);
        })
        .catch(console.error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditUserData(user);
    setIsEditDialogOpen(true);
  };

  const updateUser = () => {
    if (editUserData.id >= 0) {
      apiService
        .updateUser(editUserData.id, editUserData)
        .then(() => {
          setIsEditDialogOpen(false);
          fetchUserData();
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Is Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.is_admin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editUserData.name}
            onChange={(e) =>
              setEditUserData({ ...editUserData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={editUserData.email}
            onChange={(e) =>
              setEditUserData({ ...editUserData, email: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={editUserData.is_admin}
                onChange={(e) =>
                  setEditUserData({
                    ...editUserData,
                    is_admin: e.target.checked,
                  })
                }
              />
            }
            label="Is Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={updateUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
