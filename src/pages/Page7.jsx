import React, { useEffect, useState } from 'react';

export default function Page7({ formData, currentPage, getDataFromParent}) {
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(5)

  useEffect(()=> {
    setData(getDataFromParent())
  }, [data])
useEffect(()=>{
  setTimeout(()=>{
    setSeconds(prev=> --prev);
  }, 5000 )
})

  useEffect(() => {
    setData(formData);
  }, [currentPage, seconds]);

  if (data == null || data == undefined) {
    // If data is not available yet, display a loading message or return null
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you for your Participation!</h1>
      <p>Your response has been recorded</p>

      <h3>Here is your Result:</h3>

      {/* Render result using data */}
      <p>You skipped {data.numberOfSkippedQuestions} of {data.totalQuestions} questions, your responses were {data.result} accurate, <br />
       you generated {data.eValue} value, <br />{data.totalPossibleEvalue} was maximum</p>
      {/* Render other properties as needed */}
    </div>
  );
}