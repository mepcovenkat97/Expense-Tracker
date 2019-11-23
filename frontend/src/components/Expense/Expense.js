import React, { Component } from 'react';
import {Col,Badge, Pagination,PaginationItem, PaginationLink} from 'reactstrap';
import { Pie,Doughnut } from 'react-chartjs-2';

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

 const pie = {
   labels: [
     'Red',
     'Green',
     'Yellow',
   ],
   datasets: [
     {
       data: [300, 50, 100],
       backgroundColor: [
         '#FF6384',
         '#36A2EB',
         '#FFCE56',
       ],
       hoverBackgroundColor: [
         '#FF6384',
         '#36A2EB',
         '#FFCE56',
       ],
     }],
 };

 const doughnut = {
   labels: [
     'Red',
     'Green',
     'Yellow',
   ],
   datasets: [
     {
       data: [300, 50, 100],
       backgroundColor: [
         '#FF6384',
         '#36A2EB',
         '#FFCE56',
       ],
       hoverBackgroundColor: [
         '#FF6384',
         '#36A2EB',
         '#FFCE56',
       ],
     }],
 };


 class Expense extends Component{
    render(){
       return(
         //  <h1>Expense</h1>
         <div>
            <br />
            <Row>
            <Col xs="6" md="6" className="mb-6">
              <Card>
              <CardHeader>
                Budget Overview
              </CardHeader>
              <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
              </CardBody>
            </Card>
            </Col>
            <Col xs="6" md="6" className="mb-6">
            <Card>
              <CardHeader>
                Category wise Split
              </CardHeader>
              <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
                {console.log(doughnut)}
              </div>
              </CardBody>
            </Card>
            </Col>
            </Row>
            <Card>
            <CardBody>
            <Button color="success" size="lg">
                  <i className="fa fa-plus fa-lg"></i>&nbsp;&nbsp;Add Expense
                </Button>
                <br/><br/>
              <Table responsive className="text-center">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Item Name</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                     <td><Button size="sm" color="ghost-secondary"><i className="cui-pencil icons font-2xl d-block "></i></Button></td>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                  <td><Button size="sm" color="ghost-secondary"><i className="cui-pencil icons font-2xl d-block "></i></Button></td>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                  <td><Button size="sm" color="ghost-secondary"><i className="cui-pencil icons font-2xl d-block "></i></Button></td>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr stripped>
                  <td><Button size="sm" color="ghost-secondary"><i className="cui-pencil icons font-2xl d-block "></i></Button></td>
                    <td>Derick Maximinus</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                  <td><Button size="sm" color="ghost-secondary"><i className="cui-pencil icons font-2xl d-block "></i></Button></td>
                    <td>Friderik Dávid</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                   <Pagination>
                     <PaginationItem>
                       <PaginationLink previous tag="button"></PaginationLink>
                     </PaginationItem>
                     <PaginationItem active>
                       <PaginationLink tag="button">1</PaginationLink>
                     </PaginationItem>
                     <PaginationItem>
                       <PaginationLink tag="button">2</PaginationLink>
                     </PaginationItem>
                     <PaginationItem>
                       <PaginationLink tag="button">3</PaginationLink>
                     </PaginationItem>
                     <PaginationItem>
                       <PaginationLink tag="button">4</PaginationLink>
                     </PaginationItem>
                     <PaginationItem>
                       <PaginationLink next tag="button"></PaginationLink>
                     </PaginationItem>
                   </Pagination>
               </CardBody>
            </Card>
         <br />
         </div>
       )
    }
 }

 export default Expense;