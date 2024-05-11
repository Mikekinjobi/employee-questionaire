import React from "react";

export default function LeftAlignedTable({ data, name}) {
  return (
    <div className={name}>
      {data.map((row, index) => (
        <div className="row" key={index}>
          {row.map((cell, cellIndex) => (
            <div className="cell" key={cellIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}