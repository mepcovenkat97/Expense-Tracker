import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getAllExpense = async(id,page) => {
   const token = getAuthToken();
   const res = await axios.get(`${apiUrl}/expense/${id}?limit=5&skip=${page}`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const getAllExpenses = async(id) => {
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

export const enableExpense = async (id) => {
   const token = getAuthToken();
   const res = await axios.put(`${apiUrl}/enableexpense/${id}`, {
      headers:{
         Authorization:token,
      }
   })
   return res;
}

export const deleteExpense = async (id) => {
   const token = getAuthToken();
   const res = await axios.delete(`${apiUrl}/expense/${id}`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}