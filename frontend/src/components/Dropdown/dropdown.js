import React, { Component } from 'react';
import { getUser } from "../../apis/storage";
import { getCategory } from "../../apis/category";

export default class CategoryDropDown extends Component{

   state = {
      unassigned:[],
   }

   componentDidMount(){
      this.getAllCategory();
   }
   async getAllCategory(){
      try{
         const res = await getCategory();
         this.setState({unassigned:res.data});
      }
      catch(e){}
   }

   render(){
      let res = (
         this.state.unassigned.map((catg,index)=>{
            return (<option key={catg._id} value={catg._id}>{catg.name}</option>)
         })
      )
      return(
         {res}
      )
   }
}