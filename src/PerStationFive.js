import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import StationOneIncident from './StationOneIncident';
const PerStationOne = () => {
  const [reports, setReports] = useState([]);
  const [showIncident, setShowIncident] = useState(false);
  const [showAnonymousReports, setShowAnonymousReports] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'anonymous-reports'), where('location', '==', '5'));
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

  const handleReportChange = async (id, isTrueReport) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'anonymous-reports', id), {
        report: isTrueReport,
        trueReportButtonDisabled: isTrueReport,
        falseReportButtonDisabled: !isTrueReport,
      });
      // Update the local state to reflect the change
      setReports(prevReports =>
        prevReports.map(report => (report.id === id ? { ...report, report: isTrueReport, trueReportButtonDisabled: isTrueReport, falseReportButtonDisabled: !isTrueReport } : report))
      );
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const handleShowIncident = () => {
    setShowIncident(true);
    setShowAnonymousReports(false);
  };

  const handleShowAnonymousReports = () => {
    setShowIncident(false);
    setShowAnonymousReports(true);
  };

  return (
    <div>
      <h1>BUTUAN CITY POLICE STATION 1</h1>
      <h1>Anonymous Reports</h1>
      <button onClick={handleShowIncident} style={{ color: 'black', backgroundColor: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginBottom: '20px', fontSize: 'medium', margin: '0 10px' }}>Show Incident Reports</button>
      <button onClick={handleShowAnonymousReports} style={{ color: 'black', backgroundColor: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginBottom: '20px', fontSize: 'medium', margin: '0 10px' }}>Show Anonymous Reports</button>

      {showAnonymousReports && (
        <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Alias Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Report Type</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Details</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{report.aliasName}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{report.reportType}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{report.details}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(report.timestamp)}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{report.status ? 'Investigated' : 'Pending'}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {!report.status && (
                    <>
                      <button onClick={() => handleStatusChange(report.id)}>Mark as Investigated</button>
                    </>
                  )}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <button
                    onClick={() => handleReportChange(report.id, true)}
                    disabled={report.trueReportButtonDisabled}
                    style={{ backgroundColor: report.trueReportButtonDisabled ? 'green' : '' }}
                  >
                    True Report
                  </button>
                  <button
                    onClick={() => handleReportChange(report.id, false)}
                    disabled={report.falseReportButtonDisabled}
                    style={{ backgroundColor: report.falseReportButtonDisabled ? 'red' : '' }}
                  >
                    False Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showIncident && <StationOneIncident />}
    </div>
  );
};

export default PerStationOne;
