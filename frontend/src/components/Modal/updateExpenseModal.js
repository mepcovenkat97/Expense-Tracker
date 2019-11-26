import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateExpense,deleteExpense } from "../../apis/expense";

export default class ExpenseModal extends Component{

   constructor(props){
      super(props);
   this.state = {
      amount:this.props.amount,
   }
}

   deleteHandler = event => {
      event.preventDefault();
      this.deleteExpense();
   }

   async deleteExpense(){
      try{
         const res = await deleteExpense(this.props._id);
         this.props.onHide();
      }
      catch(e){}
   }

   handleChange = event => {
      event.preventDefault();
      console.log(event.target.value)
       this.setState({amount:event.target.value})
      // / console.log("Selected"+this.state.selected)
     }

   updateHandler = event => {
      event.preventDefault();
      this.updateExpenseDetails();
   }

   async updateExpenseDetails()
   {
      try{ 
         let formdata = [];
         formdata.push(encodeURIComponent('amount')+'='+encodeURIComponent(this.state.amount))
         formdata = formdata.toString();
         const res = await updateExpense(this.props._id,formdata);
         this.props.onHide();
         this.props.triggerUpdate();
      }
      catch(e){}
   }

   render(){
      return(
         <Modal
            {...this.props}
            size="md-2"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group as={Row}>
                     <Form.Label column sm="3">
                        Category
                     </Form.Label>
                     <Form.Control type="text" disabled  value={this.props.category}/>
                  </Form.Group>
                  <Form.Group as={Row}>
                     <Form.Label column sm="3">
                        Name
                     </Form.Label>
                     <Form.Control type="text" disabled value={this.props.itemname}/>
                  </Form.Group>
                  <Form.Group as={Row}>
                     <Form.Label column sm="3">
                        Amount
                     </Form.Label>
                     <Form.Control type="number" id="amount" value={this.state.amount} onChange={this.handleChange}/>
                  </Form.Group>
                  <Button type="submit" onClick={this.updateHandler}>Update Expense</Button>
                  <br/>
                  <Button className="btn btn-danger" type="submit" onClick={this.deleteHandler}>Delete Expense</Button>
               </Form>
            </Modal.Body>
         </Modal>
      )
   }
} 