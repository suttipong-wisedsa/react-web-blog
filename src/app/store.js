import { configureStore } from '@reduxjs/toolkit'
import create from "../api/create"

export const store = configureStore({
  reducer: {
    create_api: create,
  },
})