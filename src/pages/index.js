import React,{ useState } from 'react';
import {Row, Col } from 'react-bootstrap';
import RoutineName from "../../components/routine_name";
import Header from './header'
import Form from './form'
import Status from './status'
import Timeline from './timeline'

export default function Request() {
    const [expenseVisible, setExpenseVisible] = useState(false);  
    const [newExpense, setNewExpense] = useState({}); 

    const expenseFormSet =() =>{
      setExpenseVisible(!expenseVisible);     
   }

   const newExpenseFormSet = (newExpense) =>{
     setNewExpense(newExpense);  
   }

    return (

      <>
      <RoutineName menu='Paniel' menu_1='Solicitação' menu_2='Solicitação'  />
      <div className="container-fluid">       
        <Row>
          <Col md="8">
              <Header expenseVisible={expenseVisible} expenseFormSet={expenseFormSet}/>
              {expenseVisible &&
                <Form newExpenseFormSet={newExpenseFormSet} expenseFormSet={expenseFormSet}/>
               
              }
              <Timeline newExpense={newExpense}/>
          </Col>
          <Col md="4">                
              <Status/>
            </Col>
        </Row>
     </div>
      </> 
      
    );
  }
  
  
  