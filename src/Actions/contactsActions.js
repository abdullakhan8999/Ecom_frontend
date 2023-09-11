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
import { getUserToken } from './userActions';

//create new contact
export const createNewContact = (formDetails) => async (dispatch) => {
   try {
      dispatch(createContactsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(createContactsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.post(BASE_URL + `/create/contacts`, formDetails, config);
      const { status } = data

      dispatch(createContactsSuccess({ status }));
   } catch (error) {
      console.log("Error while create new contact:", error);
      console.log("Error while create new contact:", error.response?.data?.message);
      dispatch(createContactsFail({ error: error.response.data.message }));
   }
};

// get All contacts
export const getAllContacts = () => async (dispatch) => {
   try {
      dispatch(getAllContactsFormsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getAllContactsFormsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: {
            "Content-Type": "application/json",
            token
         },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/getAll/contacts`, config);
      const { status, contacts } = data;
      dispatch(getAllContactsFormsSuccess({ status, contacts }));
   } catch (error) {
      console.log("Error", error);
      console.log("Error", error.response.data.message);
      dispatch(getAllContactsFormsFail({ error: error.response.data.message }));
   }
};

// delete contact
export const deleteContact = (contactId) => async (dispatch) => {
   try {
      dispatch(deleteContactsFormsRequest());

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(deleteContactsFormsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      await axios.delete(BASE_URL + `/delete/contact/${contactId}`, config);
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

      const token = getUserToken()
      if (!token) {
         console.log('User not authenticated');
         dispatch(getContactDetailsFail({ error: 'User not authenticated' }));
         return;
      }
      const config = {
         headers: { "Content-Type": "application/json", token },
         withCredentials: true,
      };

      const { data } = await axios.get(BASE_URL + `/get/contact/${contactId}`, config);
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