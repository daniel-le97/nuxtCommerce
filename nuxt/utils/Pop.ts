import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { logger } from './Logger'

export default class Pop {
  static async confirm (
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    confirmButtonText = 'Yes',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning'
  ): Promise<boolean> {
    try {
      const res = await Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: 'var(--bs-primary)',
        cancelButtonColor: 'var(--bs-secondary)'
      })
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  static toast (
    title = 'Warning!',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning',
    position: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end',
    timer = 3000,
    progressBar = true
  ) {
    Swal.fire({
      title,
      icon,
      position,
      timer,
      timerProgressBar: progressBar,
      toast: true,
      showConfirmButton: false
    })
  }

  static error (error: any, eventTrigger = '') {
    logger.error(eventTrigger, error)

    if (error.isAxiosError) {
      const { response } = error
      const errorObj = (response.data ? response.data.error : response.data) || { message: 'Invalid Request ' + response.status }
      if (!errorObj) {
        return this.toast(error.message)
      }
      this.toast(errorObj.message || errorObj.error || 'error')
    } else {
      this.toast(error.message || error, 'error')
    }
  }

  static success (message = 'Success!') {
    this.toast(message, 'success')
  }
}
