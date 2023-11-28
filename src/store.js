import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './lips/todoSlice';
export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});