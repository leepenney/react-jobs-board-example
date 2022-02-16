import './NavBar.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';

function NavBar() {
    
    function showAlert(e) {
        e.preventDefault(); 
        alert(`This is a test site, so these don't work`);
    }

  return (
    <nav>
        <ul>
            <li><a href="/" onClick={(e) => showAlert(e)}>Example Jobs Board</a></li>
            <li className='selected'><a href="/browse" onClick={(e) => showAlert(e)}>Browse Jobs</a></li>
            <li><a href="/tips" onClick={(e) => showAlert(e)}>Tips</a></li>
            <li><a href="/notifications" onClick={(e) => showAlert(e)}><FontAwesomeIcon icon={faBell} /></a></li>
            <li><a href="/messages" onClick={(e) => showAlert(e)}><FontAwesomeIcon icon={faEnvelope} /></a></li>
            <li><a href="/dashboard" onClick={(e) => showAlert(e)}><FontAwesomeIcon icon={faUser} /></a></li>
        </ul>
    </nav>
  );
}

export default NavBar;