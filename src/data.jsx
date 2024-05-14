import React from 'react';
import jsonData from './dataset.json';  // Ensure the path is correct based on your project structure

function DataComponent() {
  return (
    <div>
      <h1>Hospital Data Loaded</h1>
      <ul>
        {jsonData.map((item, index) => (
          <li key={index}>
            <strong>{item.Hospital_Name}</strong><br />
            Address: {item.Address}, {item.District} <br />
            State: {item.State}, Pincode: {item.Pincode}<br />
            Category: {item.Hospital_Category}, Care Type: {item.Hospital_Care_Type}<br />
            Telephone: {item.Telephone}, Mobile: {item.Mobile_Number}<br />
            Emergency Number: {item.Emergency_Num}, Toll-Free: {item.Tollfree}<br />
            Email: {item.Hospital_Primary_Email_Id}, Website: {item.Website}<br />
            Specialties: {item.Specialties}, Facilities: {item.Facilities}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataComponent;

