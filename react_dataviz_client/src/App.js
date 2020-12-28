import React, { Component } from 'react'
import './styles/App.css'
import SvgComponent from './components/SvgComponent'
import parisData from './assets/parisData.json'

import * as d3 from 'd3'

class App extends Component {
    constructor(props) {
        super(props)
    }


    // modèle temporaire
    formater = (data) => {
        return {
            'ID_BVOTE': data.ID_BVOTE,
            'SCRUTIN': data.SCRUTIN,
            'ANNEE': data.ANNEE,
            'TOUR': data.TOUR,
            'DATE': data.DATE,
            'NUM_CIRC': data.NUM_CIRC,
            'NUM_QUARTIE': data.NUM_QUARTIE,
            'NUM_ARROND': data.NUM_ARROND,
            'NUM_BUREAU': data.NUM_BUREAU,
            'NB_PROCU': data.NB_PROCU,
            'NB_INSCR': data.NB_INSCR,
            'NB_EMARG': data.NB_EMARG,
            'NB_BLANC': data.NB_BLANC,
            'NB_EXPRIM': data.NB_EXPRIM
        }
    }

    render() {

        return (
            <div className="App">
            <h2>Paris Map</h2>
                <SvgComponent />
            </div>
        );
    }

}

export default App
