import { ValueOf } from 'types'

export const SAMPLE_PAGE = {
  ENTER: 'sample_enter',
  CLICK: 'sample_click',
  CANCEL: 'sample_cancel',
  BACK: 'sample_back',
  CONFIRM: 'sample_complete',
} as const

export type DataType = {
  [SAMPLE_PAGE.CLICK]: {
    testValue: number
  }
  [SAMPLE_PAGE.CONFIRM]: {
    testValue: string
    testValue2: number | string
    testValue3: string
  }
  [key: string]: unknown
}

export type EventNameTypes = ValueOf<typeof SAMPLE_PAGE>
