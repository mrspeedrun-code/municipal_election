import React, { Component } from 'react'
import './styles/App.css'

import NavigationBar from './components/headerComponents/NavigationBar'
import ParisMap from './components/dataVizComponents/ParisMap'
class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <NavigationBar />
                <ParisMap />
            </>
        );
    }
}

export default App
