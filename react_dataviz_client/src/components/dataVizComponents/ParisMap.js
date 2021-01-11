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
  let [dataVizBuffer, setDataVizBuffer] = useState([])

  useEffect(() => {
    //axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
    //axios.get(`${API_URL}/candidat`).then(res => setCandidate(res.data))
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/1/1`).then(res => setCandidateInfo(res.data))

    let count = 1
    let buffer = []
    //while (count <= 20) {
      for (let val in data[count]) {
        buffer.push(dataVizFormatter(val, data[count][val]))
      //} ++count
    }

    setDataVizBuffer(buffer)
    //console.log(dataVizBuffer)

  }, []);

  const getData = (district) => {
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/${district}/1`).then(res => setCandidateInfo(res.data))
    // génère un template de tableauu
  }

  const pathColor = (arrond, politique) => {
    const svg = d3.select('svg').select(arrond)

    switch(politique.toLowerCase()) {
      case 'lug':
        svg.attr('fill', '#E85333')
        break;
      case 'luc':
        svg.attr('fill', '#E8DA33')
        break;
      case 'lud':
        svg.attr('fill', '#3388E8')
        break;
      case 'lvec':
        svg.attr('fill', '#2EC61C')
        break;
      case 'ldvc':
        svg.attr('fill', '#EEE51E')
        break;
      case 'lfi':
        svg.attr('fill', '#861EEE')
        break;
      case 'ldvd':
        svg.attr('fill', '#1EC8EE')
        break;
      case 'lrn':
        svg.attr('fill', '#EE1E1E')
        break;
      case 'lp':
        svg.attr('fill', '#0DF182')
        break;
      case 'lexg':
        svg.attr('fill', '#E54ABB')
        break;
      case 'pc':
        svg.attr('fill', '#27A059')
        break;
      case 'vp':
        svg.attr('fill', '#F0C114')
        break;
      case 'pp':
        svg.attr('fill', '#096C9A')
        break;
      case 'ev':
        svg.attr('fill', '#9A091B')
        break;
      case 'lec':
        svg.attr('fill', '#D0808A')
        break;
      case 'pjtm':
        svg.attr('fill', '#9780D0')
        break;
    }
  }

  const addEventPath =  (databuffer) => {
    for(let i=0; i<=20; ++i) {
      let path = (i < 10) ? "path#arrondissement0"+i : "path#arrondissement"+i

      d3.select('svg').select(path).attr('fill', 'white').on("click", function(){
        getData(i)
      })

      try {
        if (databuffer.length > 0 && databuffer !== undefined) pathColor(path, databuffer[i].partie)
      } catch { console.log("nop") }
    }
  }

  let databuffer = []
  const dataVizFormatter2 = (main, sub) => {
    return {
      'candidat': main.candidat,
      'nb_vote': sub.Total,
      'partie': main.partie,
      'arrondissement': '1',
      'tour': '1'
    }
  }

  let bigger = 0
  if (dataVizBuffer.length > 0 && candidateInfo.length > 0) {
    for (let main of dataVizBuffer) {
      for (let sub of candidateInfo) {
        if(main.candidat === sub._id.trim()) {
          console.log(main.candidat +" + "+ sub._id)
          databuffer.push(dataVizFormatter2(main, sub))

          if (sub.Total > bigger) {
            bigger = sub.Total
            console.log("je suis le  plus grand " + bigger)
          }
        }
      }
    }

    if (databuffer.length > 0) console.log(databuffer)
    // console.log('1', dataVizBuffer[0].candidat)
    // console.log('2', candidateInfo[0]._id)

  }
  addEventPath(databuffer)

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
            {databuffer.map(({ candidat, nb_vote, partie }) => (
              <tr>
                <td className="file-title">{candidat}</td>
                <td className="file-description">{nb_vote}</td>
                <td className="politique">{partie}</td>
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

