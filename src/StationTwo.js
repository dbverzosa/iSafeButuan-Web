import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import firestore from './Firebase-config';

const StationTwo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = [];
        for (const userDoc of usersSnapshot.docs) {
          const userData = { id: userDoc.id, ...userDoc.data(), incidents: [] };
          const incidentsSnapshot = await getDocs(query(collection(db, 'incidents'), where('userId', '==', userDoc.id)));
          userData.incidents = incidentsSnapshot.docs.map(incidentDoc => ({ id: incidentDoc.id, ...incidentDoc.data() }));
          usersData.push(userData);
        }
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>STATION 2</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Reports</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.contact}</td>
              <td>
                <ul>
                  {user.incidents.map(incident => (
                    <li key={incident.id}>
                      {incident.incident} - {incident.location}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationTwo;