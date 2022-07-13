import { ValueOf } from 'types'

export const GA_EVENT_NAMES = {
  LANGUAGE_CHANGED: 'language-changed',
  THEME_CHANGED: 'theme-changed',
} as const

export type DataType = {
  [GA_EVENT_NAMES.LANGUAGE_CHANGED]: {
    lang: string
  }
  [GA_EVENT_NAMES.THEME_CHANGED]: {
    theme: string
  }
  [key: string]: unknown
}

export type EventNameTypes = ValueOf<typeof GA_EVENT_NAMES>
