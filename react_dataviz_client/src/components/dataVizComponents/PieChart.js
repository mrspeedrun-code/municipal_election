import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';
import AnimatedPieSVG from "./AnimatedPieSVG";
import styled from 'styled-components'

const Styles = styled.div`
td{padding:5px;
}
th{padding:5px;
}
p {
    font-size: small;
}
.cercleVert {
    width: 120px;
    height: 20px;
    background: #0DF182;
    font-weight: bold;
}
.cerclePs {
    width: 120px;
    height: 20px;
    background: #E85333;
    font-weight: bold;
}
.cercleUmp {
    width: 120px;
    height: 20px;
    background: #3388E8;
    font-weight: bold;
    color: white;
}
.cercleModem {
    width: 120px;
    height: 20px;
    background: #EEE51E;
    font-weight: bold;
}
.tableaux{
width:50%;
  display:inline-block;
  vertical-align:top;
}
.files-container {
  width: 98%;
  overflow-x: auto;
}

  .file-title {
    width: 20%;
  }
  .file-description {
    width: 70%;
  }
}
`;

function PieChart() {
  let [pollingStation, setPollingStation] = useState([])
  let [pollingStationDistrict1, setPollingStationDistrict1] = useState([])
  let [pollingStationDistrict2, setPollingStationDistrict2] = useState([])
  let [candidateTotal1, setCandidateTotal1] = useState([])
  let [candidateTotal2, setCandidateTotal2] = useState([])
  const dataset = 30

  const getData = (district) => {
    console.log("getData")

    // data pool table / turn 1 & 2
    axios.get(`${API_URL}/pollingStationTotalByDisctrictAndTurn/${district}/1`).then(res => setPollingStationDistrict1(res.data))
    axios.get(`${API_URL}/pollingStationTotalByDisctrictAndTurn/${district}/2`).then(res => setPollingStationDistrict2(res.data))

    // data pie chart / turn 1 & 2
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/${district}/1`).then(res => setCandidateTotal1(res.data))
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/${district}/2`).then(res => setCandidateTotal2(res.data))
  }

  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData(30));
  };

  useEffect(() => {
      axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
      axios.get(`${API_URL}/pollingStationTotalByDisctrictAndTurn/1/1`).then(res => setPollingStationDistrict1(res.data))
      axios.get(`${API_URL}/pollingStationTotalByDisctrictAndTurn/1/2`).then(res => setPollingStationDistrict2(res.data))
      setData(generateData(dataset));
    },
    [!data]
  );

  return(
    <>
      <Styles>
        <div className="cerclePs"><p>Union de la gauche</p></div>
        <div className="cercleVert"><p>Liberons Paris</p></div>
        <div className="cercleModem"><p>Union du centre</p></div>
        <div className="cercleUmp"><p>Union de la droite</p></div>
        <br />
        <h2>1er arrondissement (en cours de développements...)</h2> 
        <table>
          <th>Tour 1</th>
          <th>Tour 2</th>
          <th>Bureau de vote (Tour 1)</th>
          <th>Bureau de vote (Tour 2)</th>
          <tr>
            <td>
              <div id="chart"></div>
              <AnimatedPieSVG
                data={data}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
              />
            </td>
            <td>
              <div id="chart"></div>
                <AnimatedPieSVG
                  data={data}
                  width={200}
                  height={200}
                  innerRadius={60}
                  outerRadius={100}
                />
            </td>
            <td>
              <table>
                {pollingStationDistrict1.map(({_id, procuTotal, inscrTotal, emargTotal, votantTotal, blancTotal, exprimTotal, nulTotal}) => (
                  <>
                  <tr><td><b>arrondissement:</b> {_id}</td></tr>
                  <tr><td><b>nb_procu:</b> {procuTotal}</td></tr>
                  <tr><td><b>nb_inscr:</b> {inscrTotal}</td></tr>
                  <tr><td><b>nb_emarg:</b> {emargTotal}</td></tr>
                  <tr><td><b>nb_blanc:</b> {blancTotal}</td></tr>
                  <tr><td><b>nb_nul:</b> {nulTotal}</td></tr>
                  <tr><td><b>nb_exprim:</b> {exprimTotal}</td></tr>
                  </>
                ))}
              </table>
            </td>
            <td>
            <table>
              {pollingStationDistrict2.map(({_id, procuTotal, inscrTotal, emargTotal, votantTotal, blancTotal, exprimTotal, nulTotal}) => (
                <>
                <tr><td><b>arrondissement:</b> {_id}</td></tr>
                <tr><td><b>nb_procu:</b> {procuTotal}</td></tr>
                <tr><td><b>nb_inscr:</b> {inscrTotal}</td></tr>
                <tr><td><b>nb_emarg:</b> {emargTotal}</td></tr>
                <tr><td><b>nb_blanc:</b> {blancTotal}</td></tr>
                <tr><td><b>nb_nul:</b> {nulTotal}</td></tr>
                <tr><td><b>nb_exprim:</b> {exprimTotal}</td></tr>
                </>
              ))}
            </table>
          </td>
          </tr>
        </table>
        <h5>Choisissez un arrondissement:</h5>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Button onClick={() => getData(1)}>1</Button> <Button onClick={() => getData(2)}>2</Button> <Button>3</Button> <Button>4</Button> <Button>5</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Second group">
            <Button>6</Button> <Button>7</Button> <Button>8</Button> <Button>9</Button> <Button>10</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Third group">
            <Button>11</Button> <Button>12</Button> <Button>13</Button> <Button>14</Button> <Button>15</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2" aria-label="Four group">
            <Button>16</Button> <Button>17</Button> <Button>18</Button> <Button>19</Button> <Button>20</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </ Styles>
    </>
    )
}

export default PieChart