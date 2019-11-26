import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ScrollToBottom from 'react-scroll-to-bottom';
import { updateBudgetAction } from "../../actions/authActions";
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
import { getUser } from '../../apis/storage';
import { getCategory, addCategory, deleteCategory } from "../../apis/category";
import { updateBudget } from '../../apis/user';
import { connect } from "react-redux";

 class Setting extends Component{
    constructor(props){
       super(props);
     this.state = {
       newcategory:null,
       category:[],
    }
   }

   updateTrigger(){
      const user = getUser();
      this.setState({budget:user.user.budget});
      this.getAllCategory();
   }

    componentDidMount(){
       const user = getUser();
       this.setState({budget:user.user.budget});
       this.getAllCategory();
    }

    handleChange = event => {
       event.preventDefault();
       console.log(event.target.value);
       this.setState({[event.target.id]:event.target.value})
    }

    async getAllCategory(){
       const catg = await getCategory();
       this.setState({category:catg.data});
    }

    deleteHandler = (event, id) => {
       event.preventDefault();
       this.deleteSelectedCategory(id);
    }

    async deleteSelectedCategory(id){
       try{
          let catg;
          if(window.confirm("Are you Sure ?") === true){
               catg = await deleteCategory(id);}
          else{
               console.log("Hai");}
          this.updateTrigger();
       }
       catch(e){}
    }

    createHandler = event => {
       event.preventDefault();
       this.createCategory();
    }

   async createCategory(){
      try{
         let formdata = [];
         formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.newcategory))
         formdata = formdata.toString();
         const res = await addCategory(formdata);
         this.setState({newcategory:null})
         this.updateTrigger();
      }
      catch(e){}
   }

    updateHandler = event => {
       event.preventDefault();
       this.updateUserBudget();
    }

    async updateUserBudget(){
       try{
          const user = getUser();
          user.user.budget = this.state.budget;
          this.props.updateBudgetAction(this.state.budget);
          let formdata = [];
          formdata.push(encodeURIComponent('budget')+'='+encodeURIComponent(this.state.budget))
          formdata = formdata.toString();
          localStorage.setItem("ExpenseToken",JSON.stringify(user));
          const res = await updateBudget(user.user._id,formdata);
          this.updateTrigger();
       }
       catch(e){}
    }

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
                      id="budget"
                      name="firstName"
                      value={this.state.budget}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.updateHandler}>
                    Update
                  </Button>
               </Form>
            </Col>
            
            <Col sm="6">
               <Form>
                  <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control 
                        id="newcategory" 
                        type="text" 
                        value={this.state.newcategory}
                        placeholder="Enter Category Name"
                        onChange={this.handleChange}
                     />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.createHandler}>
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
                     { this.state.category.map((catg, index) => {
                        return (
                           <ListGroup.Item>{ catg.name } <Button size="sm" color="ghost-secondary float-right" onClick={event => this.deleteHandler(event, catg._id)}><i className="fa fa-trash-o fa-lg "></i></Button></ListGroup.Item>
                        )
                     })}  
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

 export default connect(
    null,
    {updateBudgetAction}
 )(Setting);