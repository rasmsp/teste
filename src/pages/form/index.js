import React,{ useState,useRef } from 'react';
import "./style.css";
import {Row, Col,Card } from 'react-bootstrap';
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "./../../../services/api";
import Function from "./../../../components/module/function"
import Mask from "./../../../components/module/mask"

export default function Form(props) {
    const [inputValueVisible, setInputValueVisible] = useState(false);    
    const [values, setValues] = useState({});
    const inputFile = useRef(null); 

    function onInputChange (e)  {
      let id = e.target.id;
      let value = e.target.value;
      
      if(id === 'currencyCode'){
        setInputValueVisible(true);  
      }else if(id === 'cardDate'){
        
        if(Function.isValidDate(value)){
            
            value = Mask.applyMask(Mask.MASK_DATE, value);
        }else{ 
           
          value = '';           
        }
      }else if(id === 'amountSpent' || id === 'amountTotal'){
        
          value = Function.formatDecimal(value,2,true); 
      }else if(id === 'file'){
        
        value = e.target.files[0]; 
        if(value.size > 1000000){
            alert('O tamanho máximo permitido são 1MB!');
            value = '';
        }
        let extension = Function.extentionFile(value.name);
        if(extension.toLowerCase() !== 'png' && extension.toLowerCase() !== 'jpg' && extension.toLowerCase() !== 'pdf'){

          alert('Extensão permitida PNG,JPG ou PDF!');
          value = '';
        }
    }
      
      const newValues = { ...values };
      newValues[id] = value;
      setValues(newValues);  
     
    }

    function onSave(){

     
     if(values.expenseTypeCode === undefined){

        alert('Informe o campo "Tipo"!');
        return;

     }else  if(values.currencyCode === undefined){

      alert('Informe o campo "Moeda"!');
      return;

      
     }else  if(values.notes === undefined){

      alert('Informe o campo "Descrição da despesa"!');
      return;

     }else  if(values.cardDate === undefined){

      alert('Informe o campo "Data do comprovante"!');
      return;

     }else  if(values.amountSpent === undefined || values.amountSpent === '0,00'){

      alert('Informe o campo "Valor a ser considerado"!');
      return;

     }else  if(values.amountTotal === undefined || values.amountTotal === '0,00'){

      alert('Informe o campo "Valor total da nota/cupom"!');
      return;

     }else  if(values.file === undefined){

      alert('Selecione o comprovante para envio!');
      return;

     }  

     const formData = new FormData();
     formData.append(
      "expenseTypeCode",
      values.expenseTypeCode
    );
    formData.append(
      "currencyCode",
      values.currencyCode
    );
    formData.append(
      "amountSpent",
      values.amountSpent.split('.').join('').replace(',','.')
    );
    formData.append(
      "amountTotal",
      values.amountTotal.split('.').join('').replace(',','.')
    );
    formData.append(
      "notes",
      values.notes
    );
    formData.append(
      "cardDate",
      Function.convertDateToTimestamp(values.cardDate)
    );
     formData.append(
      "resourceUrl",
      values.file
    );
   
    /*for (var item of formData.entries()) {
      console.log(item[0]+ ', ' + item[1]); 
    }*/
   

    Api.addExpense(formData).then((res) => {     

        props.newExpenseFormSet(res);
        props.expenseFormSet();
        alert('Registro Adicionado com sucesso!');
    })          

      
    }

    return (
            <>            
             <Row style={{marginBottom:10}}> 
                <Col md="12"  >             
                   <Card className="expense-card" >
                        <Card.Body className="expense-card-body">

                          <Row>
                            <Col md="6">
                              <Card className="expense-card" >
                              <Card.Body className="expense-file-card-body">

                                <Row>
                                  <Col md="12" style={{textAlign:'center'}} >                      
                                      <div  style={{fontSize:16,fontWeight:'bold'}}>
                                          Envie o comprovante
                                      </div>
                                      <div  className='upload-info'>Você pode inserir arquivos nos formatos PNG,JPG ou PDF, Tamanho máx: 10MB</div>   
                                  
                                      <div style={{display: "flex" ,justifyContent:'center'}}>
                                        <div className="upload-button-block" style={{justifyContent:'center'}} >            
                                          <button type='button' onClick={()=>inputFile.current.click()} className="upload-button"><FontAwesomeIcon  style={{color: "#6b7480"}} icon={faFilter} /> Escolher&nbsp;arquivo </button>
                                          <input type='file' id='file' ref={inputFile} accept=".png, .jpg, .pdf" style={{display: 'none'}}  onChange={onInputChange}/>
                                      </div>
                                    </div>
                                  
                                  </Col>
                                </Row>

                              </Card.Body>
                            </Card>

                            </Col>

                            <Col md="6">
                                <Row className='upload-field-row'> 
                                    <Col md="6">
                                        <div className='upload-field-title'> Tipo *</div>   
                                        <select className='form-control' 
                                                defaultValue={''}
                                                id='expenseTypeCode'                                               
                                                onChange={onInputChange}
                                                >
                                          <option value="" disabled>Tipo</option>
                                          <option value="hotel-fee" >Taxa de hotel</option>
                                          <option value="food" >Comida</option>
                                          <option value="transport">Transporte</option>
                                        </select> 
                                    </Col>
                                    <Col md="6">
                                        <div className='upload-field-title'> Moeda *</div>   
                                        <select className='form-control' 
                                                defaultValue={''}
                                                id='currencyCode'                                               
                                                onChange={onInputChange}
                                                >
                                          <option value="" disabled>Moeda</option>
                                          <option value="BRL">BRL</option>
                                          <option value="USD">USD</option>
                                          <option value="MXN">MXN</option>
                                        </select> 
                                    </Col>
                                </Row>
                                <Row className='upload-field-row'> 
                                    <Col md="6">
                                        <div className='upload-field-title'> Descrição da despesa *</div>   
                                        <input type="text" 
                                               className='form-control placeholder-text' 
                                               placeholder="Descrição da despesa" 
                                               id='notes' 
                                               maxLength={50}                                              
                                               onChange={onInputChange}  
                                               /> 
                                    </Col>
                                  
                                </Row>
                                <Row className='upload-field-row'> 
                                    <Col md="6">
                                        <div className='upload-field-title'> Data do comprovante *</div>   
                                        <input type="text" 
                                               className='form-control placeholder-text' 
                                               placeholder="Selecione a data"
                                               id='cardDate' 
                                               value={values.cardDate || ''}                                              
                                               onChange={onInputChange}
                                               /> 
                                    </Col>
                                  
                                </Row>
                                {inputValueVisible &&
                                <Row className='upload-field-row'> 
                                    <Col md="6">
                                        <div className='upload-field-title'> Valor total da nota/cupom *</div>   
                                        <input type="text" 
                                               className='form-control' 
                                               placeholder="Valor total da nota/cupom"
                                               id='amountTotal'    
                                               value={values.amountTotal || ''}                                                   
                                                onChange={onInputChange}
                                                /> 
                                    </Col>
                                    <Col md="6">
                                        <div className='upload-field-title'> Valor a ser considerado *</div>   
                                        <input type="text" 
                                               className='form-control' 
                                               placeholder="Valor a ser considerado"
                                               id='amountSpent'    
                                               value={values.amountSpent || ''}                                                      
                                               onChange={onInputChange}
                                               /> 
                                    </Col>
                                  
                                </Row>
                                }

                            </Col>


                          </Row>
                          <Row className='upload-field-row'>
                            <Col md="12" style={{display: "flex" ,justifyContent:'flex-end'}}>
                                <button className='btn btn-cancel' onClick={()=> props.expenseFormSet()}>Cancelar</button>
                                <button className='btn btn-save' onClick={()=>onSave()}>Salvar</button>
                            </Col>
                          </Row>

                        </Card.Body>
                  </Card>
                </Col>    
             </Row>        
            </>
        )
    }