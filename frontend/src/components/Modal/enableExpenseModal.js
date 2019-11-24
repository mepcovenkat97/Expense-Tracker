import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class EnableExpenseModal extends Component{
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
                  <Button type="submit">Enable Expense</Button>
               </Form>
            </Modal.Body>
         </Modal>
      )
   }
} 