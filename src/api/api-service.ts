import { User } from './schemas/user'

class ApiService {
  private static instance: ApiService
  private users: User[]

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
}

export const apiService = ApiService.getInstance()
