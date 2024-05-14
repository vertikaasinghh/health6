import React, { useState } from 'react';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import jsonData from './dataset.json';
import AreaSearchComponent from './AreaSearchComponent';
import HospitalsListComponent from './HospitalsListComponent';

const App = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [time, setTime] = useState('10'); // Add state for time
  const [areaSearchParams, setAreaSearchParams] = useState({ area: '', mode: 'walking', time: 10 });
  const hospitals = jsonData.Sheet1;  // Access the nested array

  const handleSearch = (searchTerm) => {
    const hospital = hospitals.find(hospital => hospital.Hospital_Name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSelectedHospital(hospital);
    console.log(hospital); // Debug: Check what is being set
  };

  const handleAreaSearch = (area, mode, time) => {
    console.log(`Search for area: ${area} with mode: ${mode} and time: ${time}`);
    setAreaSearchParams({ area, mode, time });
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} time={time} setTime={setTime} />
      <div style={{ position: 'relative' }}>
        <MapComponent selectedHospital={selectedHospital} time={time} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
          <AreaSearchComponent onSearch={handleAreaSearch} />
        </div>
      </div>
      <HospitalsListComponent area={areaSearchParams.area} mode={areaSearchParams.mode} time={areaSearchParams.time} />
    </div>
  );
};

export default App;
