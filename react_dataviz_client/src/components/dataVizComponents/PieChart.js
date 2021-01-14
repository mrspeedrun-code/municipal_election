import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from 'react-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap';
import { API_URL } from '../../utils/constants';
import axios from 'axios'
import * as d3 from 'd3';
import AnimatedPieSVG from "./AnimatedPieSVG";

function PieChart() {
  const generateData = (value, length = 20) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };

  useEffect(
    () => {
      setData(generateData());
    },
    [!data]
  );

  

  return(
    <>
      <h2>PIE CHART</h2>
      <div id="chart"></div>
      <AnimatedPieSVG
        data={data}
        width={200}
        height={200}
        innerRadius={60}
        outerRadius={100}
      />
    </>
    )
}

export default PieChart