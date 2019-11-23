import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ScrollToBottom from 'react-scroll-to-bottom';
import './setting.css';

import {
   Button,
   Col,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   FormGroup,
   Table,
   Input,
   Label,
   Row,
 } from 'reactstrap';

 class Setting extends Component{
    render(){
       return(
          <>
          <br/>
          <Row>
            <Col sm="6">
               <Form>
               <Form.Group as={Col} md="12" controlId="validationFormik01">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                      type="number"
                      name="firstName"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
               </Form>
            </Col>
            
            <Col sm="6">
               <Form>
                  <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category Name" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
               </Form>
            </Col>
         </Row>
         <br/>
        
         <Form.Row>
            <Col></Col>
            <Col sm="12" md="5">
               <p> List of Categories </p>
               
               <ListGroup variant="flush">
               <ScrollToBottom className="messages" >
                 <ListGroup.Item>Cras justo odio <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Dapibus ac facilisis in <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Morbi leo risus <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Porta ac consectetur ac <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Vestibulum at eros <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>

                 <ListGroup.Item>Cras justo odio <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Dapibus ac facilisis in <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Morbi leo risus <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Porta ac consectetur ac <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                 <ListGroup.Item>Vestibulum at eros <Button size="sm" color="ghost-secondary float-right"><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
               </ScrollToBottom>
               </ListGroup>
            </Col>
            <Col></Col>
         </Form.Row>
        <br/>
         </>
       )
    }
 }

 export default Setting;