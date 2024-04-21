import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

const StationOneEmergency = () => {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'emergencies'), where('nearestPoliceStation.name', '==', 'Police Station 4'));
        const snapshot = await getDocs(q);
  
        const data = [];
        for (const doc of snapshot.docs) {
          const emergencyData = doc.data();
          const userId = emergencyData.userId;
          let userName = 'Unknown';
          let userContact = 'Unknown';
  
          // Fetch user data if userId matches uid in users collection
          const userSnapshot = await getDocs(query(collection(db, 'users'), where('__name__', '==', userId)));
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            userName = userData.name;
            userContact = userData.contact;
          } else {
            console.error(`No user found for user ID: ${userId}`);
          }
  
          data.push({
            id: doc.id,
            userId: userId,
            userName: userName,
            userContact: userContact,
            latitude: emergencyData.latitude,
            longitude: emergencyData.longitude,
            status: emergencyData.status,
            nearestPoliceStation: emergencyData.nearestPoliceStation,
            timestamp: emergencyData.timestamp.toDate().toLocaleString(),
          });
        }
  
        setEmergencies(data);
      } catch (error) {
        console.error('Error fetching emergencies:', error);
      }
    };
  
    fetchEmergencies();
  }, []);
  

  return (
    <div>
         <h1>Emergencies</h1>
      <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            {/* <th style={{ border: '1px solid black', padding: '8px' }}>User ID</th> */}
            <th style={{ border: '1px solid black', padding: '8px' }}>User Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>User Contact</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Latitude</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Longitude</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Nearest Police Station</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {emergencies.map(emergency => (
            <tr key={emergency.id}>
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.userId}</td> */}
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.userName}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.userContact}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.latitude}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.longitude}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.status ? 'Responded' : 'Pending'}</td>

              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.nearestPoliceStation.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{emergency.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationOneEmergency;
