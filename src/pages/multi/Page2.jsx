// Page2.js

import React, { useState } from 'react';

const Page2 = ({ sendDataToParent, goToPreviousPage }) => {
  const [data, setData] = useState('');

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
    sendDataToParent(data);
    goToPreviousPage();
  };

  return (
    <div>
      <h2>Page 2</h2>
      <input type="text" value={data} onChange={handleChange} />
      <button onClick={handleSubmit}>Previous</button>
    </div>
  );
};

export default Page2;
