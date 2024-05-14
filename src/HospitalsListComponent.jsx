import React, { useState, useEffect } from 'react';
import jsonData from './dataset.json';

const HospitalsListComponent = ({ area, mode, time }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching hospitals for area: ${area}, mode: ${mode}, time: ${time}`);
    if (!area || !mode || !time) return;

    setLoading(true);
    setError(null);

    try {
        const filteredHospitals = jsonData.Sheet1.filter(hospital =>
            hospital.Area === area && hospital.Mode === mode && hospital.Time <= time
        );
        setHospitals(filteredHospitals);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }, [area, mode, time]);

  if (loading) return <div>Loading hospitals...</div>;
  if (error) return <div>Error: {error}</div>;

  if (Array.isArray(hospitals)) {
    return (
      <div>
        <h3>Hospitals within {time} minutes by {mode}</h3>
        <ul>
          {hospitals.map((hospital, index) => (
            <li key={index}>
              <strong>{hospital.Hospital_Name}</strong><br />
              Address: {hospital.Address}, {hospital.District} <br />
              State: {hospital.State}, Pincode: {hospital.Pincode}<br />
              Category: {hospital.Hospital_Category}, Care Type: {hospital.Hospital_Care_Type}<br />
              Telephone: {hospital.Telephone}, Mobile: {hospital.Mobile_Number}<br />
              Emergency Number: {hospital.Emergency_Num}, Toll-Free: {hospital.Tollfree}<br />
              Email: {hospital.Hospital_Primary_Email_Id}, Website: {hospital.Website}<br />
              Specialties: {hospital.Specialties}, Facilities: {hospital.Facilities}<br />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>No hospitals found or data format is incorrect.</div>;
  }
};

export default HospitalsListComponent;

