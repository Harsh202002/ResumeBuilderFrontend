import React from "react";

import styles from "./Inputcontrol.module.css";

function InputControl({ label,required, ...props }) {
  return (
    <div className={styles.container}>
      {label && <label>{label}{required && <span className={styles.required}>*</span>}</label>}
      <input type="text" required = {required} {...props} />
    </div>
  );
}

export default InputControl;