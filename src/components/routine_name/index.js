import React from 'react';
import './style.css';
import { Breadcrumb } from 'react-bootstrap';

export default function RoutineName({ menu, menuOne, menuTwo }) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active className="breadcrum-disabled">
          {menu}
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="breadcrum-disabled">
          {menuOne}
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="breadcrum-enabled">
          {menuTwo}
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
