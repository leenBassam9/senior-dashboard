import { Service } from './schemas/service'
import { Event } from './event'

class ApiService {
  private static instance: ApiService
  private services: Service[]
  public onServicesUpdated: Event<Service[]>
  constructor() {
    this.onServicesUpdated = new Event<Service[]>()
  }
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
            this.onServicesUpdated.emit(this.services)

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
    return new Promise((res, rej) => {
      fetch(`http://127.0.0.1:8000/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          res()
        })
        .then(() => {
          this.fetchServices().then(services => {
            this.services = services
            this.onServicesUpdated.emit(this.services)
            res()
          })
        })
        .catch(error => {
          console.error('Error updating service:', error)
          rej(error)
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
    return new Promise((res, rej) => {
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
          res()
        })
        .catch(error => {
          rej(error)
        })
    })
  }
}

export const serviceApi = ApiService.getInstance()
