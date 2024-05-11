import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";
import LeftAlignedTable from "../components/LeftAlignedTable";

export default function TestQuestions() {
  const [checkboxes, setCheckboxes] = useState(
    Array(data.testQuestions.length).fill(false)
  );
  let [eValue, setEValue] = useState(0);
  let [rrTotal, setTotal] = useState(306);
  let [result, setResult] = useState(0);
  let [submitted, setSubmitted] = useState(false)
  let [error, setError] = useState("");

  const calculateTotal = (index, checked) => {
    const { Value, "Resource Requirement": ResourceRequirement } =
      data.testQuestions[index];
    if (checked) {
      return rrTotal - ResourceRequirement;
    } else {
      return rrTotal + ResourceRequirement;
    }
  };

  const handleSubmit = ()=> {
        setResult((eValue/331 * 100).toFixed(1));
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
    const { Value, "Resource Requirement": ResourceRequirement } =
      data.testQuestions[index];
    if (newCheckboxes[index]) {
      setEValue((prev) => prev + Value);
    } else {
      setEValue((prev) => prev - Value);
    }
    setCheckboxes(newCheckboxes);
  };

  return (
    <>
    <h1>Practice Round</h1>

    <div className="table-div">
      {/* <div>
        <h3>Expected Value: {eValue}</h3>
        <h3>Remaining Capacity: {rrTotal}</h3>
      </div> */}
      <LeftAlignedTable data={[["Expected Value of the Portfolio", eValue], ["Remaining Capacity", rrTotal]]} name={"table-container"}/>
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
          {data.testQuestions.map((requirement, index) => (
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
    {submitted && <div>
    <h3>Results:</h3>
        <p>Practice Portfolio: {result}% optimal, 331 was the Maximum Value possible</p>
    </div>}
    <button onClick={handleSubmit} className="button-link">Submit</button> <br /><br />
    {submitted && <Link to={"/form"} className="button-link">End Practice Round</Link>}
    </>
  );
}
