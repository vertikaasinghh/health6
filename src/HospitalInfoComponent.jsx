import React from 'react';

const HospitalInfoComponent = ({ hospital }) => {
  if (!hospital) return null;
  const emergencyNumber = hospital.Emergency_Num === '0' || hospital.Emergency_Num === 0 ? '+91-17221714' : hospital.Emergency_Num;

  return (
    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3>{hospital.Hospital_Name}</h3>
      <p>Emergency Number: {emergencyNumber}</p>
      <p>Address: {hospital.Address}</p>
      <p>Category: {hospital.Hospital_Category}</p>
      <p>Website: {hospital.Website}</p>
      <p>Pincode: {hospital.Pincode}</p>
      <p>Specialities: {hospital.Specialties}</p>
           
    </div>
  );
};

export default HospitalInfoComponent;
