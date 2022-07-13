import { RefObject, useCallback } from 'react'
import { useMount, useUnmount } from 'react-use'

export const useKeys = () => {
  const useKey = (key: string, cb: (e?: KeyboardEvent) => void) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key !== key) return
        cb(e)
      },
      [cb, key]
    )

    useMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    useUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  const useEnterToConfirm = (btnRef: RefObject<HTMLButtonElement>, cb?: (e?: KeyboardEvent) => void) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return
        if (!btnRef.current) return
        if (cb) {
          cb(e)
          return
        }
        btnRef.current.click()
      },
      [btnRef, cb]
    )

    useMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    useUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  return {
    useKey,
    useEnterToConfirm,
  }
}
