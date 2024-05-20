import React, { useState, useEffect } from "react";
import managersData from "../data/managers.json";
import employeesData from "../../../../Downloads/output.json";

export default function CheckManagers() {
  const [managers, setManagers] = useState(managersData.allData || []);
  const [employees, setEmployees] = useState([...new Set(employeesData)] || []);
  const [unUsedManagers, setUnusedManagers] = useState([]);

  useEffect(() => {
    setUnusedManagers(
      managers.filter(
        (manager) =>
          manager.answerId == "54577c14-cc85-4172-b01d-86d9eae600f8" ||
          manager.answerId == "63424103-4c2f-4a59-9b04-9125e6189c18" ||
          manager.answerId == "6caef30b-ac56-48c0-a094-8c48cd1fa67c" ||
          manager.answerId == "c628a6f7-cd85-46b4-af0b-973e4c783195" ||
          manager.answerId == "e30abd1b-1a8f-49f6-9d2d-cbb7604eed07"
      )
    );
  }, [managers, employees]);

  useEffect(() => {
    console.log(unUsedManagers);
  }, [unUsedManagers]);

  return (
    <div>
      <ul>
        {unUsedManagers.map((manager) => (
          <li key={manager.answerId}>{manager.answerId}</li>
        ))}
      </ul>
    </div>
  );
}
