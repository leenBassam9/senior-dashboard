import { User } from './schemas/user'
import { Event } from './event'

class ApiService {
  private static instance: ApiService
  private users: User[]
  public onUsersUpdated: Event<User[]>
  constructor() {
    this.onUsersUpdated = new Event<User[]>()
  }
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }

    return ApiService.instance
  }

  getUsers(update = false): Promise<User[]> {
    return new Promise((res, rej) => {
      if (this.users == null || update) {
        this.fetchUsers()
          .then(users => {
            this.users = users
            this.onUsersUpdated.emit(this.users)
            res(users)
          })
          .catch(error => {
            rej(error)
          })
      } else {
        res(this.users)
      }
    })
  }

  private fetchUsers(): Promise<any> {
    return new Promise((res, rej) => {
      fetch('http://127.0.0.1:8000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            rej(response.statusText)
          }

          return response.json()
        })
        .then(data => {
          res(data.map((user: User) => ({ ...user, open: false })))
        })
        .catch(error => {
          rej(error)
        })
    })
  }

  deleteUser(userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
          }

          this.users = this.users.filter(user => user.id !== userId)
          resolve()
        })
        .catch(error => {
          console.error('Error deleting user:', error)
          reject(error)
        })
    })
  }
  updateUser(userId: number, userData: Partial<User>): Promise<void> {
    return new Promise((res, rej) => {
      fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure you're correctly handling authentication
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          return response.json()
        })
        .then(() => {
          this.fetchUsers()
            .then(users => {
              this.users = users
              this.onUsersUpdated.emit(this.users)
              res()
            })
            .catch(fetchError => rej(fetchError))
        })
        .catch(error => {
          console.error('Error updating user:', error)
          rej(error)
        })
    })
  }
}

export const apiService = ApiService.getInstance()
