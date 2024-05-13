import React from "react";
import "./module.scss";

const Module = ({ closeFunc }) => {
  return (
    <div className="module">
      <h1 onClick={()=>closeFunc(false)} className="module__closer">
        X
      </h1>
      <h2>Hello module</h2>
    </div>
  );
};

export default Module;
