import React, { useState } from 'react';

const AreaSearchComponent = ({ onSearch }) => {
  const [area, setArea] = useState('');
  const [mode, setMode] = useState('walking');
  const [time, setTime] = useState(10);

  const handleModeTimeChange = (selectedMode, selectedTime) => {
    setMode(selectedMode);
    setTime(selectedTime);
    onSearch(area, selectedMode, selectedTime);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <input
        type="text"
        placeholder="Enter area name..."
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <div>
        <button onClick={() => handleModeTimeChange('walking', 10)} style={{ margin: '5px' }}>Walking 10 min</button>
        <button onClick={() => handleModeTimeChange('walking', 20)} style={{ margin: '5px' }}>Walking 20 min</button>
        <button onClick={() => handleModeTimeChange('driving', 10)} style={{ margin: '5px' }}>Driving 10 min</button>
        <button onClick={() => handleModeTimeChange('driving', 20)} style={{ margin: '5px' }}>Driving 20 min</button>
      </div>
    </div>
  );
};

export default AreaSearchComponent;

