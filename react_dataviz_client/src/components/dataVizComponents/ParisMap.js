import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import SvgComponent from '../SvgComponents/SvgComponent'
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';
import styled from 'styled-components'
import data from  '../../utils/partie_politique.json'
import dataVizFormatter from '../../utils/dataVizFormatter'
import { quantile } from 'd3';

const Styles = styled.div`
.files-container {
  width: 98%;
  overflow-x: auto;
}
.files-table {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  tr,
  td,
  th {
    border: 1px solid #ccc;
    padding: 10px;
  }
  .file-title {
    width: 20%;
  }
  .file-description {
    width: 70%;
  }
}
`;

function ParisMap () {
  let [pollingStation, setPollingStation] = useState([])
  let [candidate, setCandidate] = useState([])
  let [candidateInfo, setCandidateInfo] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
    axios.get(`${API_URL}/candidat`).then(res => setCandidate(res.data))

    const dataVizBuffer = []
    let count = 1
    while (count <= 20) {
      for (let val in data[count]) {
        dataVizBuffer.push(dataVizFormatter(val, 20, data[count][val]))
      } ++count
    }

    console.log(dataVizBuffer)
  }, []);

  const getData = (district) => {
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/${district}/1`).then(res => setCandidateInfo(res.data))
    // génère un template de tableauu
  }

  const pathColor = (arrond, politique) => {
    const svg = d3.select('svg').select(arrond)

    switch(politique.toLowerCase()) {
      case 'gauche':
        svg.attr('fill', 'red')
        break;
      case 'droite':
        svg.attr('fill', 'blue')
        break;
    }
  }
  for(let i=0; i<=20; ++i) {
    let path = (i < 10) ? "path#arrondissement0"+i : "path#arrondissement"+i

    d3.select('svg').select(path).attr('fill', 'white').on("click", function(){
      getData(i)
    })

    pathColor(path, "gauche")
  }

  return (
    <>
      <Styles>
        <table className="files-table">
          <tr>
            <th>Tour 1</th>
            <th>Tour 2</th>
          </tr>
          <tr>
            <td><SvgComponent /></td>
            <td><SvgComponent /></td>
          </tr>
        </table>
        <h2>Résultat de vote tour 1:</h2>
        <table>
          <thead>
            <tr>
              <th>Nom du Candidat</th>
              <th>Total de vote</th>
              <th>Partie politique</th>
            </tr>
          </thead>
          <tbody>
            {candidateInfo.map(({ _id, Total }) => (
              <tr>
                <td className="file-title">{_id}</td>
                <td className="file-description">{Total}</td>
                <td className="politique">'ps'</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ Styles>
    </>
  )
}

export default ParisMap

// d3 js colorer arronidssement
// si je trouve le nb total de vote d'un candidat par arrondissement colorer avec d3
// microservice pour lister les candidatures par arrondissement et par tour
// nombre total de vote par candidat
// arrondissement du candidat
// associé au candidat un étiquette de quel partie politique ils 


// lug
// luc
// lud
// lvec 
// ldvc
// lfi
// ldvd
// lrn
// lp
// lexg
// pc
// vp
// pp
// ev
// lec
// pjtm


// pie chart
// proportion des couleurs politiques
// total de tt les votes de l'arrondissement

