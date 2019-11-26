import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getAllExpense = async(id) => {
   const token = getAuthToken();
   const res = await axios.get(`${apiUrl}/expense/${id}`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const addExpense = async data => {
   const token = getAuthToken();
   const res = await axios.post(`${apiUrl}/expense`, data, {
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const updateExpense = async (id, data) => {
   const token = getAuthToken();
   const res = await axios.put(`${apiUrl}/expense/${id}`, data, {
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const deleteExpense = async (id) => {
   const token = getAuthToken();
   const res = await axios.delete(`${apiUrl}/expense/${id}`,{
      headers:{
         Authorization:token,
      }
   })
   return res;
}