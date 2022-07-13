import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'
import store, { COLOR_SET_KEY } from 'utils/store'

export interface SystemState {
  devMode: boolean
  colorSet: string
}

const INITIAL_STATE: SystemState = {
  devMode: false,
  colorSet: store.get(COLOR_SET_KEY) || 'dark',
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setDevMode: (state: SystemState, action: PayloadAction<boolean>) => {
      state.devMode = action.payload
    },
    setColorSet: (state: SystemState, action: PayloadAction<string>) => {
      state.colorSet = action.payload
    },
  },
})

export const { setDevMode, setColorSet } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getDevMode = (state: RootState): boolean => state.system.devMode

export const getColorSet = (state: RootState): string => state.system.colorSet
