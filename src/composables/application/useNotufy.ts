import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

export interface INotifyComposition {
  notifySuccess: (text: string, duration?: number) => void
  notifyError: (text: string, duration?: number) => void
  notifyWarning: (text: string, duration?: number) => void
  notifyInfo: (text: string, duration?: number) => void
}

export function useNotify(): INotifyComposition {
  const notifySuccess = (text: string, duration?: number) => {
    notify({
      type: 'success',
      title: 'success',
      text,
      duration,
    })
  }

  const notifyError = (text: string, duration?: number) => {
    notify({
      type: 'error',
      title: 'error',
      text,
      duration,
    })
  }

  const notifyWarning = (text: string, duration?: number) => {
    notify({
      type: 'warn',
      title: 'warn',
      text,
      duration,
    })
  }

  const notifyInfo = (text: string, duration?: number) => {
    notify({
      type: 'info',
      title: 'info',
      text,
      duration,
    })
  }

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  }
}
