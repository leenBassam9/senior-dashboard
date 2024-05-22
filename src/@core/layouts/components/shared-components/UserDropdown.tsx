import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { styled } from '@mui/material/styles'

// Styled components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [userDetails, setUserDetails] = useState({
    name: 'Loading...',
    avatar: '/images/avatars/1.png', // Default or placeholder avatar path
    role: 'Admin' // Default role
  })

  const router = useRouter()

  useEffect(() => {
    const fetchUserDetails = () => {
      // Example fetching user details from local storage
      const userName = localStorage.getItem('userName') // Assuming user's name is stored in local storage

      // Update state with user details
      if (userName) {
        setUserDetails(prevDetails => ({ ...prevDetails, name: userName || 'Admin' }))
      }
    }

    fetchUserDetails()
  }, [])

  const handleDropdownOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    handleDropdownClose('/pages/login')
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    handleDropdownClose('/account-settings')
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt={userDetails.name}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={userDetails.avatar}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt={userDetails.name} src={userDetails.avatar} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{userDetails.name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userDetails.role}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={handleProfileClick}>
          <Box
            sx={{ py: 2, px: 4, display: 'flex', alignItems: 'center', color: 'text.primary', textDecoration: 'none' }}
          >
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', textDecoration: 'none' }}>
            <LogoutVariant sx={{ marginRight: 2 }} />
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
