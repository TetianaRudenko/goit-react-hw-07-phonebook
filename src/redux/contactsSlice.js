import { createSlice,  } from "@reduxjs/toolkit";
//import contactsInitialState from "contacts.json";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState:contactsInitialState ,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]:handlePending,
    [deleteContact.pending]: handlePending,
    
    [fetchContacts.rejected]:handleRejected,
    [addContact.rejected]:handleRejected,
    [deleteContact.rejected]: handleRejected,

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(contact => contact.id === action.payload.id);
      state.items.splice(index, 1);
    },
  }
    // fetchingInProgress(state) {
    //   state.isLoading = true;
    // },
    // 
    // fetchingSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.contacts = action.payload;
// 
    // },
// 
    // fetchingError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    //  addContact: {
    //    reducer(state, action) {
    //      return (state = [action.payload, ...state]);
    //    },
    //    prepare(values) {
    //      return {
    //        payload: {
    //          id: nanoid(),
    //          name: values.name,
    //          number: values.number,
    //        },
    //      };
    //    },
    //  },
//  
    //  deleteContact(state, action) {
    //    return state.filter(contact => contact.id !== action.payload)
    //  },
  
});

//export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;