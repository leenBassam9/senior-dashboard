import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import Tools from 'mdi-material-ui/Tools'
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
      sectionTitle: 'Management Section'
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
    }
  ]
}

export default navigation
