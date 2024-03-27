import { Service } from './service'

export interface User {
  id: number
  name: string
  email: string
  is_admin: boolean
  created_at: string
  service?: Service[]
  open?: boolean
}
