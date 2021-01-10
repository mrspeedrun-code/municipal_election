import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

function NavigationBar() {
  return(
    <Styles>
      <Navbar expand="lg">
      	<Navbar.Brand href="/">Election Municipale 2020</Navbar.Brand>
      </Navbar>
    </Styles >
    )
}

export default NavigationBar