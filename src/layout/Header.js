import React from 'react';
import { Link } from 'react-router-dom';
import ClearData from './ClearData';

function Header() {
  const handleClearData = () => {
    return <ClearData />;
  }

  return (
    <header style={headerStyle}>
      <h1>My Teachers</h1>
      <Link to="/clear" className="btn btn-danger btn-sm" onClick={handleClearData} style={clearData}>Clear data</Link>
      <Link to="/" style={linkStyle}>List</Link> | <Link to="/add" style={linkStyle}>Add teacher
      </Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
}

const clearData = {
  color: '#fff',
  position: 'absolute',
  right: '10px',
  top: '10px'

}

export default Header;
