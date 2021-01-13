import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import SvgComponent from '../SvgComponents/SvgComponent'
import SvgComponent2 from '../SvgComponents/SvgComponent2'
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';
import styled from 'styled-components'
import data from  '../../utils/partie_politique.json'
import data2 from  '../../utils/partie_politique2.json'
import dataVizFormatter from '../../utils/dataVizFormatter'

const Styles = styled.div`
td{padding:5px;
}
th{padding:5px;
}
p {
    font-size: small;
}
.cercleVert {
    width: 50px;
    height: 50px;
    background: green;

}
.cerclePs {
      width: 50px;
    height: 50px;
    background: red;

}
.cercleUmp {
      width: 50px;
    height: 50px;
    background: blue;


}
.cercleModem {
       width: 50px;
    height: 50px;
    background: orange;

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

function ParisMap () {
  let [pollingStation, setPollingStation] = useState([])
  let [candidate, setCandidate] = useState([])
  let [candidateInfo, setCandidateInfo] = useState([])
  let [candidateInfo2, setCandidateInfo2] = useState([])
  let [dataVizBuffer, setDataVizBuffer] = useState([])
  let [dataVizBuffer2, setDataVizBuffer2] = useState([])
  let [final, setFinal] = useState([])
  let [final2, setFinal2] = useState([])

  useEffect(() => {
    let turn = 1
    let axiosTab = []
    const axiosFormatter = (data, arr, turn) => {
      return {
        'candidat': data._id.trim(),
        'nb_vote': data.Total,
        'arrondissement': arr,
        'tour': turn
      }
    }

    axios.all([
      axios.get(`${API_URL}/candidatListAndTotalVote/1/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/2/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/3/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/4/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/5/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/6/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/7/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/8/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/9/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/10/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/11/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/12/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/13/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/14/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/15/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/16/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/17/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/18/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/19/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/20/${turn}`),
    ])
        .then(res => {
          for (let tmp in res) {
            for (let sub in res[tmp].data) {
              let num = parseInt(tmp, 10) + 1
              axiosTab.push(axiosFormatter(res[tmp].data[sub], num, turn))
              setFinal(axiosTab)
            }
          }
        });

    let turn2 = 2
    let axiosTab2 = []
    axios.all([
      axios.get(`${API_URL}/candidatListAndTotalVote/1/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/2/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/3/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/4/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/5/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/6/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/7/${turn}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/8/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/9/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/10/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/11/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/12/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/13/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/14/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/15/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/16/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/17/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/18/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/19/${turn2}`),
      axios.get(`${API_URL}/candidatListAndTotalVote/20/${turn2}`),
    ])
        .then(res => {
          for (let tmp in res) {
            for (let sub in res[tmp].data) {
              let num = parseInt(tmp, 10) + 1
              axiosTab2.push(axiosFormatter(res[tmp].data[sub], num, turn))
              setFinal2(axiosTab2)
            }
          }
        });

    //axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
    //axios.get(`${API_URL}/candidat`).then(res => setCandidate(res.data))
    let count = 1
    let dataVizbuffer = []
    while(count <= 20) {
      for (let val in data[count]) {
        dataVizbuffer.push(dataVizFormatter(val, data[count][val], count))
      } ++count
    }

    setDataVizBuffer(dataVizbuffer)

    let count2 = 1
    let dataVizbuffer2 = []
    while(count2 <= 20) {
      for (let val in data2[count2]) {
        dataVizbuffer2.push(dataVizFormatter(val, data2[count2][val], count2))
      } ++count2
    }

    setDataVizBuffer2(dataVizbuffer2)

  }, []);

  const getData = (district, tour) => {
    axios.get(`${API_URL}/candidatListDistinctAndTotalVote/${district}/${tour}`).then(res => {
      if(tour ==1)setCandidateInfo(res.data)
      if(tour ==2)setCandidateInfo2(res.data)
    })
  }

  const pathColor = (arrond, politique, id) => {
    const svg = d3.select(id).select(arrond)

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
      default:
        svg.attr('fill', 'white')
        break;
    }
  }

  const addEventPath =  (databuffer, id, turn) => {
    for(let i=0; i<=20; ++i) {
      let path = (i < 10) ? "path#arrondissement0"+i : "path#arrondissement"+i

      d3.select(id).select(path).attr('fill', 'white').on("click", function(){
        getData(i, turn)
      })

      try {
        if (databuffer.length > 0 && databuffer !== undefined) {
          if (i > 0) {
            //console.log(i,"patate", databuffer[i-1].arrondissement)
            //console.log(databuffer[i-1])
            if(i === databuffer[i-1].arrondissement) {
              pathColor(path, databuffer[i-1].partie, id)
            }
          }
        }
      } catch { console.log("nop") }
    }
  }

  let databuffer = []
  let databuffer2 = []
  const dataVizFormatter2 = (main, sub) => {
    return {
      'candidat': main.candidat,
      'nb_vote': sub.nb_vote,
      'partie': main.partie,
      'arrondissement': sub.arrondissement,
      'tour': sub.tour
    }
  }


  setTimeout(() => {
    if (dataVizBuffer.length > 0 && final.length > 0) {
      let idx = 0; // compteur non doublon
      let idx2 = 0

      for (let main of dataVizBuffer) {
        for (let sub of final) {
          if(main.candidat === sub.candidat
              && main.arrondissement === sub.arrondissement
              && databuffer[idx] === undefined) {
            //console.log(main.candidat +" + "+ sub.candidat)
            //console.log(main.arrondissement + " " + sub.arrondissement)
            databuffer.push(dataVizFormatter2(main, sub))
          }
        }
        ++idx;
      }

      for (let main of dataVizBuffer2) {
        for (let sub of final2) {
          if(main.candidat === sub.candidat
              && main.arrondissement === sub.arrondissement
              && databuffer2[idx2] === undefined) {
            databuffer2.push(dataVizFormatter2(main, sub))
          }
        }
        ++idx2;
      }
    }

    if (databuffer.length > 0 && databuffer2.length > 0) {
      addEventPath(databuffer, '#Layer_1', 1)
      addEventPath(databuffer2, '#Layer_2', 2)
    }

  }, 1000);

  return (
      <>
        <Styles>
          <div className="tableaux">
            <div className="cerclePs"><p>PS</p></div>
            <div className="cercleVert"><p>EELV</p></div>
            <div className="cercleModem"><p>Modem</p></div>
            <div className="cercleUmp"><p>UMP</p></div>
            <div><h6>Tour1</h6></div>
            <div><SvgComponent /></div>
            <div><h6>Résultat T1</h6></div>
            <th>Nom du Candidat</th>
            <th>Total de vote</th>
            {candidateInfo.map(({_id, Total}) => (
                <tr>
                  <td className="file-title">{_id}</td>
                  <td className="file-description">{Total}</td>
                </tr>
            ))}
          </div>
          <div className="tableaux">
            <div className="cerclePs"><p>PS</p></div>
            <div className="cercleVert"><p>EELV</p></div>
            <div className="cercleModem"><p>Modem</p></div>
            <div className="cercleUmp"><p>UMP</p></div>
            <div><h6>Tour2</h6></div>
            <div><SvgComponent2/></div>
            <div><h6>Résultat T2</h6></div>
            <th>Nom du Candidat</th>
            <th>Total de vote</th>
            {candidateInfo2.map(({_id, Total}) => (
                <tr>
                  <td className="file-title">{_id}</td>
                  <td className="file-description">{Total}</td>
                </tr>
            ))}
          </div>
        </ Styles>
      </>
  )
}

export default ParisMap


