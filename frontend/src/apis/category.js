import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getCategory = async () => {
   const token = getAuthToken();
   const res = await axios.get(`${apiUrl}/category`,{
      headers:{
         Authorization:token
      }
   })
   return res;
}

export const addCategory = async (data) => {
   const token = getAuthToken();
   const res = await axios.post(`${apiUrl}/category`, data, {
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
   return res;
}

export const deleteCategory = async (id) => {
   const token = getAuthToken();
   const res = await axios.delete(`${apiUrl}/category/${id}`, {
      headers:{
         Authorization:token
      }
   })
   return res;
}