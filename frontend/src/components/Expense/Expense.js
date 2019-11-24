import React, { Component, useState, useEffect } from 'react';
import {Badge, Pagination,PaginationItem, PaginationLink} from 'reactstrap';
import { Pie,Doughnut } from 'react-chartjs-2';
import { getAllExpense } from '../../apis/expense';
import Expenserow from '../Row/row';
import AddExpenseModal from "../Modal/addExpenseModal";

import {
   Button,
   Card,
   CardBody,
   CardHeader,
   Table,
   Row,
   Col,
 } from 'reactstrap';
import { getUser } from '../../apis/storage';

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

    constructor(props){
      super(props);
      this.state = {
        pie:null,
        doughnut:null,
        expenses:[],
        expense:null,
        showModal:false,
      };
      //this.toggle = this.toggle.bind(this);
    }

    toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
   }

   triggerUpdate(){
     console.log("Inside Trigger Update");
     const show = !this.state.showModal;
     this.setState({showModal:show});
     this.getExpense();
     this.render();
   }

    componentDidMount(){
      //this.getPieChart();
      //this.getDoughnutChart();
      this.getExpense();
    }

    async getExpense(){
      try{
        const user = getUser();
        //console.log(user.user._id);
        const res = await getAllExpense(user.user._id);
        //console.log(res.data);
        this.setState({expenses:res.data});
        console.log(this.state.expenses)
      }
      catch(e){}
    }

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
            <Button color="success" size="lg" onClick={() => this.toggleModel()}>
                  <i className="fa fa-plus fa-lg"></i>&nbsp;&nbsp;Add Expense
            </Button>
            <AddExpenseModal
              show = {this.state.showModal}
              onHide = {this.toggleModel}
              triggerUpdate = {this.triggerUpdate}
            />
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
                    {this.state.expenses.map((exp, index)=>{
                      return (
                      <Expenserow 
                        _id={exp._id} 
                        key={index}
                        triggerUpdate = {this.triggerUpdate}
                        category={exp.category.name} 
                        itemname={exp.itemname} 
                        amount={exp.amount} 
                        expensemadeon={exp.expensemadeon.slice(0,10)}
                        isDeleted={exp.isDeleted}/>
                        )
                    })}
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