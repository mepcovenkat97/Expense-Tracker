import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { enableExpense } from '../../apis/expense'

export default class EnableExpenseModal extends Component{

   constructor(props){
      super(props);
   }

   enableHandler = event => {
      event.preventDefault();
      this.enableExpenseHandler();
   }

   async enableExpenseHandler(){
      try{
         const exp = await enableExpense(this.props._id);
         this.props.onHide();
         this.props.triggerupdate();
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
                     <Form.Control type="number" disabled value= {this.props.amount}/>
                  </Form.Group>
                  <Button type="submit" onClick={this.enableHandler}>Enable Expense</Button>
               </Form>
            </Modal.Body>
         </Modal>
      )
   }
} 