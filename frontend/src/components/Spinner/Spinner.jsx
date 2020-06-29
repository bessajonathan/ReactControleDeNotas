import React from "react";
import style from "./spinner.module.css";

function Spinner() {
  return (
    <div className={style.flexRow}>
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <span>Aguarde...</span>
    </div>
  );
}

export default Spinner;
