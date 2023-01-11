import React from 'react';
import { useRef, useEffect, useState } from 'react';
//import ReactDOM from "react-dom";
import { select } from 'd3';

//const data = [25, 30, 45, 60, 20]

const LineChart = () => {

    const [data, setData] = useState([25, 30, 45, 60, 20])

    const svgRef = useRef()
    console.log(svgRef)

    useEffect(() => {
        console.log(svgRef)
        const svg = select(svgRef.current)
        svg
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("r", value => value)
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2)
            .attr("stroke", "red")
    }, [data])

    return (
        <div>
            <svg ref={svgRef}>
                <circle />
            </svg>
        </div>
    );


}

export default LineChart;