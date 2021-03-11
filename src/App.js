import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';

import Header from './components/header';

import Menu from './components/menu';

import Request from './pages/request';

import './style.css';

export default function App() {
  return (
    <Container fluid="true">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex">
            <Menu />

            <div style={{ width: '100%' }}>
              <Request />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
