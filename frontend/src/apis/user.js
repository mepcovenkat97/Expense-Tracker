import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const updateBudget = async (id, data) => {
   const token = getAuthToken();
   const res = await axios.put(`${apiUrl}/user/${id}`, data, {
      headers:{
         Authorization:token,
         'Content-Type':"application/x-www-form-urlencoded"
      }
   })
}