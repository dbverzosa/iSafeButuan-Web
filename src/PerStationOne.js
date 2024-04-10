import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';

const PerStationOne = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'anonymous-reports'), where('location', '==', '1'));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date && date.toDate().toLocaleDateString(undefined, options);
  };

  const handleStatusChange = async (id) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'anonymous-reports', id), { status: true });
      // Update the local state to reflect the change
      setReports(prevReports =>
        prevReports.map(report => (report.id === id ? { ...report, status: true } : report))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const handleFormSubmit = async (id, updatedDetails) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'anonymous-reports', id), updatedDetails);
      // Update the local state to reflect the change
      setReports(prevReports =>
        prevReports.map(report => (report.id === id ? { ...report, ...updatedDetails } : report))
      );
      setSelectedReport(null);
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div>
      <h1>Anonymous Reports - Station 1</h1>
      <table>
        <thead>
          <tr>
            <th>Alias Name</th>
            <th>Report Type</th>
            <th>Details</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.aliasName}</td>
              <td>{report.reportType}</td>
              <td>{report.details}</td>
              <td>{formatDate(report.timestamp)}</td>
              <td>{report.status ? 'Investigated' : 'Pending'}</td>
              <td>
                {!report.status && (
                  <>
                    <button onClick={() => handleStatusChange(report.id)}>Mark as Investigated</button>
                  
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default PerStationOne;
