import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
   name: "admin",
   initialState: {
      contacts: [],
      contact: {},
      contactsLoading: false,
      status: '',
      error: null,
   },
   reducers: {
      createContactsRequest: (state) => {
         state.contactsLoading = true;
         state.status = "";
      },
      createContactsSuccess: (state, action) => {
         state.contactsLoading = false;
         state.status = "Message Sent Successfully";
      },
      createContactsFail: (state, action) => {
         state.contactsLoading = false;
         state.error = action.payload.error;
      },
      getAllContactsFormsRequest: (state) => {
         state.contactsLoading = true;
         state.contacts = [];
         state.status = "";
      },
      getAllContactsFormsSuccess: (state, action) => {
         state.contactsLoading = false;
         state.contacts = action.payload.contacts;
         state.status = action.payload.status;
      },
      getAllContactsFormsFail: (state, action) => {
         state.contactsLoading = false;
         state.error = action.payload.error;
      },
      deleteContactsFormsRequest: (state) => {
         state.contactsLoading = true;
         state.status = "";
      },
      deleteContactsFormsSuccess: (state, action) => {
         state.contactsLoading = false;
         state.status = "Contact deleted successfully";
      },
      deleteContactsFormsFail: (state, action) => {
         state.contactsLoading = false;
         state.error = action.payload.error;
      },
      getContactDetailsRequest: (state, action) => {
         state.contactsLoading = true;
         state.contact = [];
      },
      getContactDetailsSuccess: (state, action) => {
         state.contactsLoading = false;
         state.contact = action.payload.contact;
      },
      getContactDetailsFail: (state, action) => {
         state.contactsLoading = false;
         state.error = action.payload.error;
      },
      clearErrors: (state) => {
         state.error = null;
         state.status = "";
      },
   },
});

export const {
   clearErrors,
   createContactsRequest,
   createContactsSuccess,
   createContactsFail,
   getAllContactsFormsRequest,
   getAllContactsFormsSuccess,
   getAllContactsFormsFail,
   deleteContactsFormsRequest,
   deleteContactsFormsSuccess,
   deleteContactsFormsFail,
   getContactDetailsRequest,
   getContactDetailsSuccess,
   getContactDetailsFail,
} = contactsSlice.actions;

export default contactsSlice.reducer;
