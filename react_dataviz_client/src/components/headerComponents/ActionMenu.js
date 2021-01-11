import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, ButtonGroup, NavItem  } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { API_URL } from '../../utils/constants';
import axios from 'axios'

function ActionMenu() {
  return(
    <>
      <ButtonGroup size="lg" className="mb-2">
        <Link to="/"><Button>Carte SVG</Button></Link>
        <Link to="/pieChart"><Button variant="info">Pie Chart</Button></Link>
      </ButtonGroup>
      <br />
    </>
    )
}

export default ActionMenu