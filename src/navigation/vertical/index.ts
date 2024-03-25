import Login from 'mdi-material-ui/Login'

import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import AccountMultiple from 'mdi-material-ui/AccountMultiple' // Changed for Manage Users
import Tools from 'mdi-material-ui/Tools' // Chan
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },

    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Manage Services',
      icon: Tools,
      path: '/manage-services'
    },

    {
      title: 'Manage Users',
      icon: AccountMultiple,
      path: '/manage-users'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }

    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
  ]
}

export default navigation
