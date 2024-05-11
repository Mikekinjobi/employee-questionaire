import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DownloadExcelController = () => {
    const postsQuery = useQuery({
        queryKey: ["allData"],
        queryFn: async () => {
          const response = await axios.get("https://questionaire-backend-01x0.onrender.com/allData");
          return response.data.allData;
        }
      });
    
      if (postsQuery.isLoading) return <h1>Loading...</h1>;
      if (postsQuery.isError) return <h1>Error: {postsQuery.error.message}</h1>;

  const downloadExcelFile = () => {
    const fileName = "data.csv";
    const csvContent = convertJsonArrayToCsv(postsQuery.data);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const convertValueToString = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  const convertJsonArrayToCsv = (jsonArray) => {
    if (!jsonArray || jsonArray.length === 0) return "";

    const headers = Object.keys(jsonArray[0]);
    const rows = [headers.join(",")];

    for (let obj of jsonArray) {
        const values = headers.map(header => {
            if (Array.isArray(obj[header])) {
                return obj[header].join("; ");
            }
            return convertValueToString(obj[header]);
        });
        rows.push(values.join(","));
    }
    
    return rows.join("\n");
};

  return (
    <button onClick={downloadExcelFile}>
      Download Excel File
    </button>
  );
};

export default DownloadExcelController;
