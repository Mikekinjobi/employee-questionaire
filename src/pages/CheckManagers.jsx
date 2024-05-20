// import React, { useState, useEffect } from "react";
// import managersData from "../data/managers.json";
// import employeesData from "../../../../Downloads/output.json";

// export default function CheckManagers() {
//   const [managers, setManagers] = useState(managersData.allData || []);
//   const [employees, setEmployees] = useState([...new Set(employeesData)] || []);
//   const [unUsedManagers, setUnusedManagers] = useState([]);

//   useEffect(() => {
//     setUnusedManagers(
//       managers.filter(
//         (manager) =>
//           employees.filter(
//             (employee) => employee.managerId === manager.answerId
//           ).length === 1
//       )
//     );
//   }, [managers, employees]);

//   useEffect(()=> {
//     console.log(unUsedManagers);
//   }, [unUsedManagers])

//   return (
//     <div>
//       <ul>
//         {unUsedManagers.map((manager) => (
//           <li key={manager.answerId}>{manager.answerId}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

