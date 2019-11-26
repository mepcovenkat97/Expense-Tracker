import React, { Component, Suspense } from 'react';
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
import { getUserDetails } from '../../apis/user';

 class Expense extends Component{

    constructor(props){
      super(props);
      this.state = {
        expenses:[],
        expense:null,
        showModal:false,
        changed:false,
        doughnut:null,
        pie:null,
      };
      this.toggleModel = this.toggleModel.bind(this);
    }

    loading = () => (
      <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
      this.getExpense();
   }

    componentDidMount(){
      this.getExpense();
    }

    getPieChart(){
      const user1 = getUser();
      const pie = {
        labels :Object.keys(user1.user.categoryspent),
        datasets:[
          {
            data:Object.values(user1.user.categoryspent),
            backgroundColor:[
              '#FF6384',
              '#36A2EB',
            ],
            hoverBackgroundColor:[
              '#FF6384',
              '#36A2EB',
            ],
            borderWidth: 1
          }
        ]
      }
      return pie;
      //this.setState({pie:pie});
    }

    getDoughnut(){
      const user1 = getUser();
      //const user = await getUserDetails(user1.user._id);
      const doughnut = {
        labels :["Spent", "Remaining"],
        datasets:[
          {
            data:[user1.user.totalexpense,user1.user.budget],
            backgroundColor:[
              '#FF6384',
              '#36A2EB',
            ],
            hoverBackgroundColor:[
              '#FF6384',
              '#36A2EB',
            ],
            borderWidth: 5
          }
        ]
      }
      return doughnut
      //this.setState({doughnut:doughnut})
    }

    triggerupdate(){
      console.log("Inside Trigger Update")
      this.getExpense()
    }

    async getExpense(){
      try{
        console.log("Inside Get Expense");
        const user = getUser();
        const res = await getAllExpense(user.user._id);
        this.setState({expenses:res.data});
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
                    <Doughnut data={this.getDoughnut()} />
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
                <Pie data={this.getPieChart()} />
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
              triggerUpdate={this.triggerupdate}
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
                        category={exp.category.name} 
                        itemname={exp.itemname} 
                        amount={exp.amount} 
                        expensemadeon={exp.expensemadeon.slice(0,10)}
                        triggerUpdate={this.triggerupdate}
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