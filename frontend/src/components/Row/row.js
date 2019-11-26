import React, { Component } from "react";
import { Button } from 'reactstrap';
import ExpenseModal from "../Modal/updateExpenseModal";
import EnableExpenseModal from "../Modal/enableExpenseModal";

 export default class Expenserow extends Component{
    
   constructor(props){
      super(props);
      this.state = {
         showModal:false,
      }
   }
   
   toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
      //this.props.triggerupdate();
   }


    render(){
       let row;
       if(this.props.isDeleted === false)
       {
          row = (
            <tr>
               <td>
                  <Button onClick={() => this.toggleModel()} size="sm" color="ghost-secondary">
                     <i className="cui-pencil icons font-2xl d-block "></i>
                  </Button>
               </td>
               <td>{this.props.category}</td>
               <td>{this.props.itemname}</td>
               <td>{this.props.amount}</td>
               <td>
                 {this.props.expensemadeon}
               </td>
               <ExpenseModal
                  _id={this.props._id}
                  itemname={this.props.itemname}
                  amount={this.props.amount}
                  category = {this.props.category}
                  show = {this.state.showModal}
                  onHide = {this.toggleModel}
                  triggerupdate = {this.props.triggerupdate}
               />
            </tr>
          )
       }
       else
       {
         const rowStyle = {
            color:"red"//"rgb(250, 177, 177)"
         }
         row = (
            <tr style={rowStyle}>
               <td>
                  <Button onClick={() => this.toggleModel()} size="sm" color="ghost-grey">
                     <i className="cui-pencil icons font-2xl d-block "></i>
                  </Button>
               </td>
               <td>{this.props.category}</td>
               <td>{this.props.itemname}</td>
               <td>{this.props.amount}</td>
               <td>
                 {this.props.expensemadeon}
               </td>
               <EnableExpenseModal
                  _id={this.props._id}
                  itemname={this.props.itemname}
                  amount={this.props.amount}
                  category = {this.props.category}
                  onHide = {this.toggleModel}
                  show = {this.state.showModal}
                  triggerupdate = {this.props.triggerupdate}
               />
            </tr>
          )
       }
       return(
          <>
          
         {row}
         </>
       )
    }
 }