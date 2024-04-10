import React, { useState } from 'react';
import StationOne from './StationOne';
import StationTwo from './StationTwo';
import StationThree from './StationThree';
import StationFour from './StationFour';
import StationFive from './StationFive';

const Home = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  const handleStationClick = (stationNumber) => {
    setSelectedStation(stationNumber);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <header style={{ backgroundColor: '#333', color: 'white', padding: 20, textAlign: 'center' }}>
        <h1>Police Station Dashboard</h1>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center' }}>
            <li style={{ marginRight: 10 }}><button onClick={() => handleStationClick(1)}>Station 1</button></li>
            <li style={{ marginRight: 10 }}><button onClick={() => handleStationClick(2)}>Station 2</button></li>
            <li style={{ marginRight: 10 }}><button onClick={() => handleStationClick(3)}>Station 3</button></li>
            <li style={{ marginRight: 10 }}><button onClick={() => handleStationClick(4)}>Station 4</button></li>
            <li><button onClick={() => handleStationClick(5)}>Station 5</button></li>
          </ul>
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        {selectedStation === 1 && <StationOne />}
        {selectedStation === 2 && <StationTwo />}
        {selectedStation === 3 && <StationThree />}
        {selectedStation === 4 && <StationFour />}
        {selectedStation === 5 && <StationFive />}
      </main>
    </div>
  );
};

export default Home;
