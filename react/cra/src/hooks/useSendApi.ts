import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'

import useThrottleCallback from './useThrottleCallback'

export function useSendApi<T extends any[] = any[]>(
  apiFn: (...args: T) => void,
  errorHandler?: (err: AxiosError<unknown> | unknown) => void
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AxiosError<unknown> | unknown>()

  const callFn = useThrottleCallback(async (...args: T) => {
    if (isLoading) return
    setIsLoading(true)
    setError(undefined)
    try {
      await apiFn(...args)
    } catch (err) {
      setError(err)
      errorHandler?.(err)
    } finally {
      setIsLoading(false)
    }
  })

  const resetError = useCallback(() => setError(undefined), [])

  return [isLoading, callFn, error, resetError] as const
}
