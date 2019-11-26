import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Input } from 'reactstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addExpense } from "../../apis/expense";
import { getUser } from '../../apis/storage'
import { getCategory } from "../../apis/category";
import CategoryDropDown from "../Dropdown/dropdown";

export default class AddExpenseModal extends Component{

   constructor(props){
      super(props);
      this.state = {
         category:null,
         itemname:null,
         amount:null,
         expensemadeon:null,
         unassigned:[],
      }
   }

   componentDidMount(){
      this.getAllCategory();
   }

   async getAllCategory(){
      try{
         const res = await getCategory();
         this.setState({unassigned:res.data});
      }
      catch(e){}
   }

   handleChange = event => {
      event.preventDefault();
      this.setState({ [event.target.id]: event.target.value });
   }

   createHandler = event => {
      event.preventDefault();
      console.log("Hai ")
      this.addNewExpense();
   }

   async addNewExpense() {
      try{
         console.log("Inside API")
         let user = getUser();
         user.user.totalexpense = (parseInt(user.user.totalexpense) + parseInt(this.state.amount)).toString();
         localStorage.setItem("ExpenseToken",JSON.stringify(user));
         let formdata = [];
         formdata.push(encodeURIComponent('category')+'='+encodeURIComponent(this.state.category))
         formdata.push(encodeURIComponent('itemname')+'='+encodeURIComponent(this.state.itemname))
         formdata.push(encodeURIComponent('amount')+'='+encodeURIComponent(this.state.amount))
         formdata.push(encodeURIComponent('expensemadeon')+'='+encodeURIComponent(this.state.expensemadeon))
         formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(user.user._id));
         formdata.push(encodeURIComponent('isDeleted')+'='+encodeURIComponent(false));
         formdata = formdata.join("&")
         const response  = await addExpense(formdata);
         this.props.onHide();
         this.props.triggerUpdate();
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
                     <Input type="select" id="category" onChange={this.handleChange}>
                              <option value="1">--Choose--</option>
                              {this.state.unassigned.map((catg,index) => {
                                 return (<option key={catg._id} value={catg._id}>{catg.name}</option>)
                              })}
                     </Input>
                  </Form.Group>
                  <Form.Group as={Row}>
                     <Form.Label column sm="3">
                        Name
                     </Form.Label>
                     <Form.Control id="itemname" type="text" onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group as={Row}>
                     <Form.Label column sm="3">
                        Amount
                     </Form.Label>
                     <Form.Control id="amount" type="number" onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group as={Row}>
                     <Form.Label column sm="12">
                        Date of Expense Made
                     </Form.Label>
                     <Form.Control id="expensemadeon" type="date" onChange={this.handleChange}/>
                  </Form.Group>
                  <Button type="submit" onClick={this.createHandler}>Add Expense</Button>
               </Form>
            </Modal.Body>
         </Modal>
      )
   }
} 