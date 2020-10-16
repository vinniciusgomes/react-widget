import React from "react";

interface IProps {
  data: {
    value: string;
  };
}

const App: React.FC<IProps> = ({ data }) => {
  return (
    <div className="h-100 w-100 border rounded">
      <h1 style={{ fontFamily: "sans-serif" }}>ReactJS Widget</h1>
      <h3 style={{ fontFamily: "sans-serif" }}>{data.value}</h3>
    </div>
  );
};

export default App;
