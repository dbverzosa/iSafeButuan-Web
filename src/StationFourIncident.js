import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const StationFourIncident = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
        try {
          const db = getFirestore();
          const incidentsRef = collection(db, 'incidents');
          const querySnapshot = await getDocs(incidentsRef);
          const incidentsData = [];
      
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.location === '4') {
              incidentsData.push({
                id: doc.id,
                ...data,
                isReported: false,
                status: data.status || 'Pending',
              });
            }
          });
      
          setIncidents(incidentsData);
        } catch (error) {
          console.error('Error fetching incidents:', error);
        }
      };

    fetchIncidents();
  }, []);

  const handlePlainClothesClick = async (id) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'incidents', id), { plainClothes: true });
      setIncidents(prevIncidents =>
        prevIncidents.map(incident =>
          incident.id === id ? { ...incident, plainClothes: true } : incident
        )
      );
    } catch (error) {
      console.error('Error updating plain clothes status:', error);
    }
  };
  
  const handleUniformedClick = async (id) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'incidents', id), { uniformed: true });
      setIncidents(prevIncidents =>
        prevIncidents.map(incident =>
          incident.id === id ? { ...incident, uniformed: true } : incident
        )
      );
    } catch (error) {
      console.error('Error updating uniformed status:', error);
    }
  };
  

  const handleReportClick = async (id) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'incidents', id), { report: true});
      setIncidents(prevIncidents =>
        prevIncidents.map(incident =>
          incident.id === id ? { ...incident, report: true } : incident
        )
      );
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  return (
    <div>
      <h1>Incidents Reports</h1>
      <style>{`
        .red-button {
          background-color: red;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          color: white;
        }
        .red-button.reported {
          background-color: green;
        }
      `}</style>
      <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Incident</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Location Details</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Timestamp</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Display to Police App for Response</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Uniformed</th>
            {/* <th style={{ border: '1px solid black', padding: '8px' }}>Accepted Uniformed</th> */}
            <th style={{ border: '1px solid black', padding: '8px' }}>Plain Clothes</th>
            {/* <th style={{ border: '1px solid black', padding: '8px' }}>Accepted Plain Clothes</th> */}
            {/* <th style={{ border: '1px solid black', padding: '8px' }}>Response Time</th> */}
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{incident.incident}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{incident.locationDetails}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{incident.status}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{incident.timestamp && (
  <>
    {new Date(incident.timestamp.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}{', '}
    {new Date(incident.timestamp.seconds * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
  </>
)}
</td>

              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{incident.timestamp && incident.timestamp.toDate().toString()}</td> */}
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button className={`red-button ${incident.report ? 'reported' : ''}`} onClick={() => handleReportClick(incident.id)}>Report</button>
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button className={`red-button ${incident.uniformed ? 'reported' : ''}`} onClick={() => handleUniformedClick(incident.id)}>Need</button>
              </td>
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>
  {incident.acceptedUniformed || incident.acceptedPlainClothes ? 'Accepted' : 'Pending'}
</td> */}
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{incident.acceptedUniformed ? 'Accepted' : 'Pending'}</td> */}
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button className={`red-button ${incident.plainClothes ? 'reported' : ''}`} onClick={() => handlePlainClothesClick(incident.id)}>Need</button>
              </td>
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>
  {incident.acceptedPlainClothes || incident.acceptedUniformed ? 'Accepted' : 'Pending'}
</td> */}
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{incident.acceptedPlainClothes ? 'Accepted' : 'Pending'}</td> */}
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{incident.timeResponse}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationFourIncident;



