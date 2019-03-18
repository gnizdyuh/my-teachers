import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>My Teachers</h1>
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

export default Header;
