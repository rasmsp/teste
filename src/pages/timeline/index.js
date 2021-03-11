import React,{ useState, useEffect } from 'react';
import "./style.css";
import {Row, Col,Card } from 'react-bootstrap';
import {  faAsterisk,faChevronDown,faConciergeBell, faReceipt, faUsers} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Function from "./../../../components/module/function"
import Api from "./../../../services/api";

export default function Status(props) {

    const [timeline, setTimeline] = useState([]);     

    useEffect(() => {

        Api.getTimeline().then((res) => {            
            setTimeline(res.content);          
        })            

    }, []);


    useEffect(() => {
   
        if(Object.keys(props.newExpense).length !== 0 && timeline.length > 0)
            setTimeline([...timeline,props.newExpense]);  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.newExpense]); 

    

    function Evaluation(item){      
       return (

        <Row>
        <Col md="2" >
            <div  className="circle circle-purple"><FontAwesomeIcon  className="circle-icon circle-icon-purple" icon={faUsers} /></div>
            <div className='date'>{Function.convertTimestampToDate(item.item.cardDate)}</div>
            
        </Col>
        <Col md="4" className='column'> 
            <div className='timeline-title' >TIPO</div>
            <div className='timeline-value'>Aprovação da Solicitação {item.item.author.name}</div>           
        </Col>       
        <Col md="4" className='column'>
            <div  className='timeline-title' >STATUS</div>
            <div className='status-block' >Aprovado</div>
        </Col>
        <Col md="2" className='column'>
            <div className='view-info'> Ver aprovações <FontAwesomeIcon   icon={faChevronDown} /></div>
        </Col>
    </Row> 
       )     
    }

    function Request(item){
     
     
        return (
 
         <Row>
         <Col md="2" >
             <div  className="circle circle-purple"><FontAwesomeIcon  className="circle-icon circle-icon-purple" icon={faAsterisk} /></div>
             <div className='date'>{Function.convertTimestampToDate(item.item.cardDate)}</div>
             
         </Col>
         <Col md="10" className='column' > 
             <div className='timeline-title' >TIPO</div>
             <div className='timeline-value'>Solicitação concluída por Backoffice Team</div>            
         </Col>
         
     </Row> 
        )     
     }
 
     function Hotel(item){
     
     
        return (
 
         <Row>
         <Col md="2" >
             <div  className="circle circle-blue"><FontAwesomeIcon  className="circle-icon circle-icon-blue" icon={faConciergeBell} /></div>
             <div className='date'>{Function.convertTimestampToDate(item.item.cardDate)}</div>
             
         </Col>
         <Col md="2" className='column' > 
             <div className='timeline-title' >TIPO</div>
             <div className='timeline-value'>Hotel</div>
             <div className='timeline-additional'>{item.item.expenseId}</div>
         </Col>
         <Col md="2" className='column'>
             <div  className='timeline-title'>Valor</div>
             <div  className='timeline-value'>{Function.formatCurrency(item.item.currencySymbol,item.item.amountSpent)}</div>
             <div className='timeline-additional'> Valor da nota: {item.item.expenseId}</div>
         </Col>
         <Col md="4" className='column'>
            <div  className='timeline-title' >STATUS</div>
            <div className='status-block' >Aprovado</div>
            <div className='status-other' >Dedutível</div>
            <div className='timeline-additional'> Valor aprovado: {Function.formatCurrency(item.item.currencySymbol,item.item.amountSpent)}</div>
        </Col>
             
         <Col md="2" className='column'>
            <div className='view-info'> <FontAwesomeIcon   icon={faReceipt} /> Ver nota fiscal </div>
        </Col>
     </Row> 
        )     
     }
 

    function GetTimeline(){    
        if(timeline.length === 0) return '';
       
        const html = []; 
        
        timeline.map((item,i) =>{              
            html.push(
                <Row key={i} className='timeline-row'>
            
                <Col>
                    <Card className="timeline-card">
                      <Card.Body className="timeline-card-body">
    
                        {item.cardType === 'EVALUATION' &&
                            <Evaluation item={item}/>
                        }
                        { (item.cardType === 'ACCOUNTABILITY_SUBMITTED' || item.cardType === 'ACCOUNTABILITY_CREATED' ) &&
                            <Request item={item}/>
                        }
                        {item.cardType === 'EXPENSE' &&
                            <Hotel item={item}/>
                        }
                       
    
                      </Card.Body>
                    </Card>
                </Col>
             
            </Row>
            )
            return '';
        });       
        return html;     
     
     }
  

    return (
            <>            
             <GetTimeline/>
            </>
        )
    }