import React, { useState, useEffect } from 'react'
import SvgComponent from '../SvgComponents/SvgComponent'
import { API_URL } from '../../utils/constants';
import axios from 'axios'

function ParisMap () {
  let [pollingStation, setPollingStation] = useState([])
  let [candidate, setCandidate] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/pollingStation`).then(res => setPollingStation(res.data))
    axios.get(`${API_URL}/candidat`).then(res => setCandidate(res.data))
  }, []);

    return (
      <>
      <SvgComponent />
      {candidate.map((data) => (
        <>
          <h2>{data.CANDIDAT}</h2>
        </>
      ))}
      </>
    )
}

export default ParisMap

// d3 js colorer arronidssement
// si je trouve le nb total de vote d'un candidat par arrondissement colorer avec d3
// microservice pour lister les candidatures par arrondissement et par tour
// nombre total de vote par candidat
// arrondissement du candidat
