import React, { useState, useEffect } from 'react'
import SvgComponent from '../SvgComponents/SvgComponent'
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';

function ParisMap () {
  let [pollingStation, setPollingStation] = useState([])
  let [candidate, setCandidate] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
    axios.get(`${API_URL}/candidat`).then(res => setCandidate(res.data))
  }, []);

  const pathColor = (arrond, politique) => {
    const svg = d3.select('svg').select(arrond)

    switch(politique.toLowerCase()) {
      case 'gauche':
        svg.attr('fill', 'red')
        break;
      case 'droite':
        svg.attr('fill', 'blue')
        break;
      default:
        console.log('test')
    }
  }
  pathColor("path#arrondissement04", "droite")

  return (
    <>
      <SvgComponent />
    </>
  )
}

export default ParisMap

// d3 js colorer arronidssement
// si je trouve le nb total de vote d'un candidat par arrondissement colorer avec d3
// microservice pour lister les candidatures par arrondissement et par tour
// nombre total de vote par candidat
// arrondissement du candidat
