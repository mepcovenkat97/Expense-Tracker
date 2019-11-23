import React, { Component } from 'react';
import {Col, Nav, NavItem, NavLink, TabContent, TabPane, Form} from 'reactstrap';
import {
   Button,
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

 class Profile extends Component{
    render(){
       return(
          <>
            <br />
            <Row>
               <Col></Col>
               <Col md="6" >
                  <Card>
                     <CardBody>
                        <h1>Profile</h1>
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