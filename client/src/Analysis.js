import React from 'react';
import { Container } from 'react-bootstrap';
import LineChart from './components/charts/LineChart';
// import './c3.css';

const Analysis = () => {
    return <>
        <Container>
            <h2 className="text-center">Analysis</h2>
        </Container>

        <Container>
            <LineChart />
        </Container>
    </>
}

export default Analysis;
