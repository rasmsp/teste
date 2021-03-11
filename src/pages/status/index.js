import React,{ useState, useEffect } from 'react';
import "./style.css";
import {Row, Col,Card } from 'react-bootstrap';
import { faArrowCircleDown,faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Function from "./../../../components/module/function"
import Api from "./../../../services/api";


export default function Status() {
  const [sidebar, setSidebar] = useState([]);     

    useEffect(() => {

        Api.getSidebar().then((res) => {            
             setSidebar(res.content);          
        })            

    }, []);


    function GetExtract(){          
      if(sidebar.length === 0) return '';
      
      const html = []; 
      
      sidebar.map((item,i) =>{              
          html.push(

            <Card key={i} className="balance-card" >
              <Card.Body className="balance-card-body">
                    <Row>
                      <Col md="12" className='center'>
                          <div className='balance-title'>SALDO</div>
                          
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" className='center'>
                          <div className='balance-value'>{Function.formatCurrency(item.currency.symbol,item.balance)}</div>
                      </Col>
                    </Row>
                    <Row>                     
                      <Col md="6">
                          <Row>
                              <Col md="1">
                                  <FontAwesomeIcon  style={{color: "#E7E7E7"}} icon={faArrowCircleUp} /> 
                              </Col>
                              <Col md="8" >
                                 <div  style={{flexDirection:'column'}}>
                                    <div className='resume-title'>Gastou</div>
                                    <div className='resume-value'>{Function.formatCurrency(item.currency.symbol,item.returned)}</div>
                                    
                                 </div>
                              </Col>
                          </Row> 
                      </Col>
                      <Col md="6" className='header-divisor' >
                      <Row>
                              <Col md="1">
                                  <FontAwesomeIcon  style={{color: "#E7E7E7"}} icon={faArrowCircleDown} /> 
                              </Col>
                              <Col md="8">
                                 <div  style={{flexDirection:'column'}}>
                                    <div className='resume-title'>Recebeu</div>
                                    <div className='resume-value'>{Function.formatCurrency(item.currency.symbol,item.received)}</div>
                                    
                                 </div>
                              </Col>
                          </Row>  
                       </Col>
                    </Row>
                    <Row>
                      <Col>
                          <div className='extract-title'>Extrato</div>
                          <div className='center'>
                              <div className='balance-extract-divider' />   
                          </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                          <div className='extract-item-title'>Descrição</div>                          
                      </Col>
                      <Col>
                          <div className='extract-item-title'>Valor</div>                                         
                      </Col>
                    </Row>
                    <Row>
                      <Col md='6'>
                          <div className='extract-item-value'>Despesas declaradas</div>                          
                      </Col>
                      <Col md='6'>
                          <div className='extract-item-value'> {Function.formatCurrency(item.currency.symbol,item.declared)}</div>       
                                                
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='extract-item-info'> Despesas declaradas pelo tropper </div>       
                                                   
                      </Col>                     
                    </Row>

                    <Row>
                      <Col md='6'>
                          <div className='extract-item-value'>Despesas aprovadas</div>                          
                      </Col>
                      <Col md='6'>
                          <div className='extract-item-value'> {Function.formatCurrency(item.currency.symbol,item.approved)}</div>                                                       
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='extract-item-info'> Despesas aprovadas pelo financeiro </div>                                                          
                      </Col>                     
                    </Row>

                    <Row>
                      <Col md='6'>
                          <div className='extract-item-value'>Pagamento realizado </div>                          
                      </Col>
                      <Col md='6'>
                          <div className='extract-item-value-payment'> {Function.formatCurrency(item.currency.symbol,item.received)}</div>                                                       
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='extract-item-info'>Despesas realizado pelo financeiro</div>       
                                                   
                      </Col>                     
                    </Row>

                    
              </Card.Body>
            </Card>
          )
          return '';
      });
     
      return html;     
   
   }

    return (
            <>  
            <Card className="status-card">
                <Card.Body className="status-card-body">             
                      <Row>
                        <Col md="12" className='center'>
                          <div className='status-title'>Status</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12" className='center'>
                          <div className='status-value'>Concluído</div>
                        </Col>
                      </Row>
                </Card.Body>
              </Card>
              <GetExtract/> 
            </>
        )
    }