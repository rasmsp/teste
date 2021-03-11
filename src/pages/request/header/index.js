import React, { useState, useEffect } from 'react';
import './style.css';
import { Row, Col, Card } from 'react-bootstrap';
import { faEdit, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api from '../../../services/api';
import Function from '../../../components/module/function';

export default function Header(props) {
  const [header, setHeader] = useState({});

  useEffect(() => {
    Api.getHeader().then((res) => {
      setHeader(res);
    });
  }, []);

  function AmountOfPeopleText() {
    if (typeof header.accountabilityExtraInfo === 'undefined') return '';
    const { amountOfPeople } = header.accountabilityExtraInfo;
    return amountOfPeople.toString() === '1'
      ? '1 pessoa'
      : `${amountOfPeople} pessoas`;
  }

  function BudgetForBreakfastText() {
    if (typeof header.accountabilityExtraInfo === 'undefined') return '';
    const { budgetForBreakfast } = header.accountabilityExtraInfo;
    return budgetForBreakfast == null ? 'Não' : budgetForBreakfast;
  }

  function CostCenterText() {
    if (typeof header.costCenters === 'undefined') return '';
    const html = [];
    const { costCenters } = header;
    costCenters.map((item) => {
      html.push(
        <div key={item.id}>
          {item.percentage}% - {item.name}
        </div>
      );
      return '';
    });

    return html;
  }

  return (
    <>
      <Row>
        <Col md="12">
          <Card className="header-card">
            <Card.Body className="header-card-body">
              <Row style={{ paddingLeft: 25 }}>
                <Col className="header-title">
                  Reembolso #{header.id} - {header.justification}
                </Col>
                <Col className="header-icon-edit">
                  <FontAwesomeIcon style={{ color: '#FFFFFF' }} icon={faEdit} />
                </Col>
              </Row>

              <Row style={{ paddingLeft: 25, marginTop: 20 }}>
                <Col md="8">
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Nome
                    </Col>
                    <Col className="header-data-value">
                      {header.collaborator && header.collaborator.name}
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      E-mail
                    </Col>
                    <Col className="header-data-value">
                      {header.collaborator && header.collaborator.email}
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Justificativa
                    </Col>
                    <Col className="header-data-value">
                      {header.justification}
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Finalidade
                    </Col>
                    <Col className="header-data-value">{header.purpose}</Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Projeto
                    </Col>
                    <Col className="header-data-value">
                      {header.project && header.project.title}
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Data
                    </Col>
                    <Col className="header-data-value">
                      {header.accountabilityExtraInfo &&
                        Function.convertTimestampToDate(
                          header.accountabilityExtraInfo.eventDate
                        )}
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Quantidade
                    </Col>
                    <Col className="header-data-value">
                      <AmountOfPeopleText />
                    </Col>
                  </Row>
                  <Row className="header-data-row">
                    <Col md="3" className="header-data-title">
                      Incluir café da manhã
                    </Col>
                    <Col className="header-data-value">
                      <BudgetForBreakfastText />
                    </Col>
                  </Row>
                </Col>
                <Col className="header-divisor">
                  <Row className="header-row header-col-right-begin">
                    <Col className="header-data-value">
                      <div className="header-label"> Atribuir analista</div>
                      <select
                        className="form-control header-form-select"
                        defaultValue=""
                      >
                        <option
                          value=""
                          disabled
                          className="header-form-select-option-text"
                        >
                          Atribuir analista
                        </option>
                      </select>
                    </Col>
                  </Row>

                  <Row className="header-col-right-end">
                    <Col className="header-data-value">
                      <div className="header-label"> Centro de Custo</div>
                      <CostCenterText />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="btn-expend-add">
            <button
              type="button"
              className="btn-expend-add-button"
              onClick={() => props.expenseFormSet()}
            >
              <FontAwesomeIcon style={{ color: '#748E97' }} icon={faReceipt} />{' '}
              Adicionar&nbsp;Despesa
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
}
