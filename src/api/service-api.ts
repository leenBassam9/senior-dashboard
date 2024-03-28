import { Service } from './schemas/service'

class ApiService {
  private static instance: ApiService
  private services: Service[]

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }

    return ApiService.instance
  }

  getService(update = false): Promise<Service[]> {
    return new Promise((res, rej) => {
      if (this.services == null || update) {
        this.fetchServices()
          .then(services => {
            this.services = services
            res(services)
          })
          .catch(error => {
            rej(error)
          })
      } else {
        res(this.services)
      }
    })
  }
  updateService(serviceId: number, updateData: { name?: string; description?: string; price?: number }): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8000/api/services/${serviceId}`, {
        method: 'PUT', // Use 'PUT' if your API requires replacing the entire resource
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
        },
        body: JSON.stringify(updateData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          resolve()
        })
        .catch(error => {
          console.error('Error updating service:', error)
          reject(error)
        })
    })
  }

  private fetchServices(): Promise<any> {
    return new Promise((res, rej) => {
      fetch('http://127.0.0.1:8000/api/services', {
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
          res(data.map((service: Service) => ({ ...service, open: false })))
        })
        .catch(error => {
          rej(error)
        })
    })
  }

  deleteService(serviceId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8000/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
          }
          this.services = this.services.filter(service => service.id !== serviceId)
          resolve()
        })
        .catch(error => {
          console.error('Error deleting user:', error)
          reject(error)
        })
    })
  }
}

export const serviceApi = ApiService.getInstance()
