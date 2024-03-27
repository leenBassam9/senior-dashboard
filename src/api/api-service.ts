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

  fetchUsers(): Promise<any> {
    return new Promise((res, rej) => {
      fetch('http://127.0.0.1:8000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      })
        .then(response => {
          if (!response.ok) {
            rej(response.statusText)
          }

          return response.json()
        })
        .then(data => {
          res(data.map((user: User) => ({ ...user, open: false }))) // Initialize with open state
        })
        .catch(error => {
          rej(error)
        })
    })
  }
}

export const apiService = ApiService.getInstance()
