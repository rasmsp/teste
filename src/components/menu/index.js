import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
  return (
    <>
      <div className="menu border-right">
        <div className="list-group list-group-flush">
          <a href="/" className="list-group-item2 list-group-item-action">
            <FontAwesomeIcon style={{ color: '#6bb1c7' }} icon={faAngleLeft} />
          </a>
          <a href="/" className="list-group-item3 list-group-item-action">
            &nbsp;
          </a>
        </div>
      </div>
    </>
  );
}
