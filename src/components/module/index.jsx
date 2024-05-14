import React from "react";
import "./module.scss";

const Module = ({ closeFunc }) => {
  return (
    <div className="module">
      <h1 onClick={()=>closeFunc(false)} className="module__closer">
        X
      </h1>
      <form action="">
        
      </form>
    </div>
  );
};

export default Module;
