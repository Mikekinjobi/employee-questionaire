import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import LeftAlignedTable from "../components/LeftAlignedTable";
import data from "../data/data.json";

export default function Table1({formData, updateFields}) {
  const [checkboxes, setCheckboxes] = useState(
    Array(data.table1data.length).fill(false)
  );
  let [submitted, setSubmitted] = useState(false);
  let [eValue, setEValue] = useState(0);
  let [rrTotal, setTotal] = useState(2979);
  let [error, setError] = useState("");
  
useEffect(()=>{
  updateFields({table1Evalue: eValue})
}, [eValue])
  const calculateTotal = (index, checked) => {
    const { Value, 'Resource Requirement': ResourceRequirement } = data.table1data[index];
    if (checked) {
      return rrTotal - ResourceRequirement;
    } else {
      return rrTotal + ResourceRequirement;
    }
  };

  const handleSubmit = ()=>{

    setSubmitted(true);
  }

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    const totalAfterChange = calculateTotal(index, newCheckboxes[index]);
    if (totalAfterChange < 0) {
      setError("Error: Cannot select this option. Resource requirement exceeds remaining capacity.");
      return;
    } else {
      setError("");
    }
    // if (totalAfterChange < 0) return; 
    setTotal(totalAfterChange);
    const { Value, 'Resource Requirement': ResourceRequirement } = data.table1data[index];
    if (newCheckboxes[index]) {
      setEValue(prev => prev + Value);
    } else {
      setEValue(prev => prev - Value);
    }
    setCheckboxes(newCheckboxes);
    const table1Choices = [];
    newCheckboxes.forEach((check, index)=>{
        if(check){
          table1Choices.push(data.table1data[index].resourceId)
        }
    })
    updateFields({table1Choices: table1Choices})
  };
  return (
    <>
    
    <div style={{display:"flex", position: "relative"}}>
      <div style={{marginTop: "50vh"}}>
      <h1>Portfolio 1</h1>
      <div style={{width: "200px"}}>
      <p style={{color: "blue", textAlign:"left"}}>Each portfolio item you select determines tasks the employees must perform. Higher resource requirements for selected items correspond to more difficult tasks for employees.</p>
      </div>
    <LeftAlignedTable data={[["Expected Value of The Portfolio", eValue], ["Remaining Capacity", rrTotal]]} name={"table-container"}/>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
      <table>
      <thead>
          <tr>
            <th>Expected Value</th>
            <th>Resource Requirement</th>
            <th>Value/Resource Requirement</th>
            <th>Value - Resource Requirement</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {data.table1data.map((requirement, index) => (
            <tr key={index}>
              <td>{requirement["Value"]}</td>
              <td>{requirement["Resource Requirement"]}</td>
              <td>{requirement["Value/Resource Requirement"]}</td>
              <td>{requirement["Value - Resource Requirement"]}</td>
              <td>
              {calculateTotal(index, !checkboxes[index]) < 0 && (
                <span style={{ color: 'red', fontSize:"x-small"}}>
                Resource Requirement exceeds remaining capacity
              </span>
  )}
                <input
                  type="checkbox"
                  checked={checkboxes[index]}
                  onChange={() => handleCheckboxChange(index)}
                  disabled={calculateTotal(index, !checkboxes[index]) < 0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    {/* {!submitted && <button onClick={handleSubmit} className="button-link">Submit</button>} */}
    {submitted && <Link to={'/table2'} className="button-link">Next</Link>}
    </>
  );
}
