import axios from 'axios';
let BASE_URL = 'https://ecomm-backend-5fix.onrender.com/api/v1';
// BASE_URL = "http://localhost:4000/api/v1";
// BASE_URL = "/api/v1";

import {
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
} from '../reducers/contactsSlice';

//create new contact
export const createNewContact = (formDetails) => async (dispatch) => {
   try {
      dispatch(createContactsRequest());

      const config = {
         headers: { "Content-Type": "application/json" },
         withCredentials: true,
      };

      const { data } = await axios.post(BASE_URL + `/create/contacts`, formDetails, config);
      const { status, savedContact } = data
      dispatch(createContactsSuccess({ status, contact: savedContact }));
   } catch (error) {
      console.log("Error while create new contact:", error);
      console.log("Error while create new contact:", error.response?.data?.message);
      dispatch(createContactsFail({ error: error.response.data.message }));
   }
};

// get All contacts
export const getAllContacts = () => async (dispatch) => {
   dispatch(getAllContactsFormsRequest());
   try {
      const { data } = await axios.get(BASE_URL + `/getAll/contacts`);
      const { status, contacts } = data;
      dispatch(getAllContactsFormsSuccess({ status, contacts }));
   } catch (error) {
      console.log("Error", error);
      console.log("Error", error.response.data.message);
      dispatch(getAllContactsFormsFail({ error: error.response.data.message }));
   }
};

// delete contact
export const deleteReview = (contactId) => async (dispatch) => {
   dispatch(deleteContactsFormsRequest());
   try {
      await axios.delete(BASE_URL + `/delete/contact/${contactId}`);
      dispatch(deleteContactsFormsSuccess());
   } catch (error) {
      console.log("Error delete contact", error);
      dispatch(deleteContactsFormsFail({ error: error.response.data.message }));
   }
};

// get contact details
export const getContactDetails = (contactId) => async (dispatch) => {
   try {
      dispatch(getContactDetailsRequest());
      const { data } = await axios.get(BASE_URL + `/get/contact/${contactId}`);
      const { status, contact } = data;
      dispatch(getContactDetailsSuccess({ status, contact }));
   } catch (error) {
      console.log("Error get contact details", error);
      dispatch(getContactDetailsFail({ error: error.response.data.message }));
   }
}

//Clear all errors
export const clearUserErrors = () => async (dispatch) => {
   dispatch(clearErrors());
};