import './App.css';
import Home from './Home.js';
import PerStationOne from './PerStationOne.js';
import PerStationFour from './PerStationFour.js';
import Reports from './Reports.js';
import StationFive from './StationFive.js';
import StationFour from './StationFour.js';
import StationOne from './StationOne.js';
import StationThree from './StationThree.js';
import StationTwo from './StationTwo.js';
// import firestore from './Firebase-config';




function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
     {/* <PerStationOne/> */}
     <PerStationFour/>
        {/* <Home/> */}
        {/* <Reports/> */}
        {/* <StationOne/>
        <StationTwo/>
        <StationThree/>
        <StationFour/>
        <StationFive/> */}
        </p>
      
      </header>
    </div>
  );
}

export default App;
