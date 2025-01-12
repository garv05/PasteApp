import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : [],
};

// console.log("Initial state from localStorage:", initialState.pastes);  // Verify initial state

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state,action) => {

      const paste = action.payload;
      // const Name = state.pastes.findIndex((item) => item.name === paste.name)
      // if(Name === -1){
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        console.log(state.pastes.length);
        // console.log("ger");
        toast.success("Paste Created Successfully")
      // }
      // else{
      //   toast.error("Paste Already Exsits");
      // }
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if(index >=0 ){
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
      toast.success("Paste Updated");
    },
    resetAllPastes: (state,action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state,action) => {
      const pasteId = action.payload;
      console.log(pasteId);

      const index = state.pastes.findIndex((item) =>item._id === pasteId)
      if(index >=0 ){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer