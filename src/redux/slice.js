import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  open: false,
  postList: [],
  modalEdit: false,
  editId: '',
  setdatavalue:false
};

export const counterSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    increment: (state) => {
      state.open = true;
    },
    decrement: (state) => {
      state.open = false;
    },
    modalOpen: (state) => {
      state.modalEdit = true;
    },
    closeModal: (state) => {
      state.modalEdit = false;
    },
    setListPost: (state, action) => {
      state.postList = JSON.stringify(action.payload);
    },
    setIdEdit: (state, action) => {
        state.editId = String(action.payload.id);
      },
    setData: (state, action) => {
        state.setdata = !action.payload
        console.log(state.setdata)
      },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setListPost ,modalOpen,closeModal,setIdEdit,setData} =
  counterSlice.actions;

export default counterSlice.reducer;
