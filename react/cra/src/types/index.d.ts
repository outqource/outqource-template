declare global {
  interface Window {
    ll: (...params: unknown[]) => void
    lw: (...params: unknown[]) => void
    le: (...params: unknown[]) => void
  }
}

export type ValueOf<T extends Object> = T[keyof T]
