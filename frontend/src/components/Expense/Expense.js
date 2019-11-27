import React, { Component } from 'react';
import ReactPaginate from "react-paginate";
//import {Badge, Pagination,PaginationItem, PaginationLink} from 'reactstrap';
import { Pie,Doughnut } from 'react-chartjs-2';
import { getAllExpenses,getAllExpense } from '../../apis/expense';
import Expenserow from '../Row/row';
import AddExpenseModal from "../Modal/addExpenseModal";
import './Expense.css';

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
        perPage: 5,
      };
      this.toggleModel = this.toggleModel.bind(this);
    }

    loading = () => (
      <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
      //this.getExpense();
      this.getTenExpenses(0);
   }

   triggerupdate = () => {
    console.log("Inside Trigger Update");
    //this.getExpense();
    this.getTenExpenses(0);
    this.getDoughnut();
    this.getPieChart();
  }

    componentDidMount(){
      //this.getExpense();
      this.getTenExpenses(0);
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
              'yellow',
              'green',
              'red',
              'blue',
              'orange',
            ],
            hoverBackgroundColor:[
              '#FF6384',
              '#36A2EB',
              'yellow',
              'green',
              'red',
              'blue',
              'orange',
            ],
            borderWidth: 1
          }
        ]
      }
      console.log(pie);
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
            data:[user1.user.totalexpense,(user1.user.budget-user1.user.totalexpense)],
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

    handlePageClick = data => {
      const pageNumber = data.selected;
      this.setState({ pageNumber });
      this.getTenExpenses(pageNumber);
      console.log("selected", data.selected);
      // this.setState({ selectedPage: selectedPage });
    };

    async getTenExpenses(pagenumber){
      try{
        const user = getUser();
        const response = await getAllExpense(user.user._id, pagenumber);
        this.setState({expenses:response.data});
        this.props.countPostsAction(response.data.count);
        const totalPages = Math.ceil(response.data.count / this.state.perPage);
        this.setState({ pageCount: totalPages });
      }
      catch(e){}
    }


    async getExpense(){
      try{
        console.log("Inside Get Expense");
        const user = getUser();
        const res = await getAllExpenses(user.user._id);
        console.log(res.data.length);

        //this.setState({pageCount:(res.data.length/5)+1});
      }
      catch(e){}
    }

    render(){
      const rowStyle = {
        backgroundColor:"red"//"rgb(250, 177, 177)"
     }

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
              triggerupdate={this.triggerupdate}
            />
            <span className="float-right"><span style={rowStyle}>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;-&nbsp;Deleted Expense<br/> </span>
                <br/><br/>
                  {
                    (this.state.expenses.length > 0)
                      ?(
                        <>
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
                            {
                              this.state.expenses.map((exp, index)=>{
                                return (
                                <Expenserow 
                                  _id={exp._id} 
                                  key={index}
                                  category={exp.category.name} 
                                  itemname={exp.itemname} 
                                  amount={exp.amount} 
                                  expensemadeon={exp.expensemadeon.slice(0,10)}
                                  triggerupdate={this.triggerupdate}
                                  isDeleted={exp.isDeleted}/>
                                  )
                              })
                            }
                          </tbody>
                        </Table>

                        <ReactPaginate
                          previousLabel={"← Previous"}
                          nextLabel={"Next →"}
                          breakLabel={<span className="gap">...</span>}
                          pageCount={this.state.pageCount}
                          onPageChange={this.handlePageClick}
                          containerClassName={"pagination"}
                          previousLinkClassName={"previous_page"}
                          nextLinkClassName={"next_page"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                        />

                        </>
                    ):(
                      (<h1>No Expenses Made Till Now</h1>)
                    )}
                
               </CardBody>
            </Card>
         <br />
         </div>
       )
    }
 }

 export default Expense;