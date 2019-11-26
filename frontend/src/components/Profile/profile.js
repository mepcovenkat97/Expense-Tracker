import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { getUser } from '../../apis/storage';
import {
   Card,
   CardBody,
   Row,
   Col,
 } from 'reactstrap';

 class Profile extends Component{
    render(){
      const user = getUser();
       return(
          <>
            <br />
            <Row>
               <Col></Col>
               <Col md="5" >
                  <Card>
                     <CardBody>
                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                              Name
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control plaintext readOnly defaultValue={user.user.name} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                              Email
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control plaintext readOnly defaultValue={user.user.email} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                              Budget
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control plaintext readOnly defaultValue={user.user.budget} />
                            </Col>
                          </Form.Group>
                     </CardBody>
                  </Card>
               </Col>
               <Col></Col>
            </Row>
          </>
       )
    }
 }

 export default Profile;