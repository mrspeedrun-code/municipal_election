import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import SvgComponent from '../SvgComponents/SvgComponent'
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';
import styled from 'styled-components'

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

    function candidatEvent() {
      axios.get(`${API_URL}/candidatListDistinctAndTotalVote/1/1`).then(res => setCandidateInfo(res.data))
    }

    //candidatEvent()
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
  pathColor("path#arrondissement04", "droite")

  for(let i=0; i<=20; i++) {
    let path = (i < 10) ? "path#arrondissement0"+i : "path#arrondissement"+i

    d3.select('svg').select(path).attr('fill', 'green').on("click", function(){
      getData(i)
    })
  }

  return (
    <>
      <Styles>
        <ButtonGroup size="lg" className="mb-2">
          <Button>Carte SVG</Button>
          <Button variant="info">Pie Chart</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={getData}>Tour 1</Button>
          <Button variant="secondary">Tour 2</Button>
        </ButtonGroup>
        <SvgComponent />

        <h2>Résultat de vote</h2>
        <table className="files-table">
          <thead>
            <tr>
              <th>Nom du Candidat</th>
              <th>Total de vote</th>
            </tr>
          </thead>
          <tbody>
            {candidateInfo.map(({ _id, Total }) => (
                  <tr>
                    <td className="file-title">{_id}</td>
                    <td className="file-description">{Total}</td>
                  </tr>
                )
              )
            }
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