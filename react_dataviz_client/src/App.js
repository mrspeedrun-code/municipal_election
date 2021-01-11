import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css'
import NavigationBar from './components/headerComponents/NavigationBar'
import ActionMenu from './components/headerComponents/ActionMenu'
import {SvgMapPage} from './pages/SvgMapPage'
import {PieChartPage} from './pages/PieChartPage'
import {NoMatchPage} from './pages/NoMatchPage'
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <React.Fragment>
          <Router>
              <NavigationBar />
              <ActionMenu />

                <Switch>
                  <Route exact path="/" component={SvgMapPage} />
                  <Route path="/pieChart" component={PieChartPage} />
                  <Route component={NoMatchPage} />
                </Switch>

          </Router>
        </React.Fragment>
      </>
    );
  }
}

export default App
