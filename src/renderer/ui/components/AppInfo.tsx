import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const AppInfo = () => {
  return (
    <div style={{ fontSize: "0.7rem" }}>
      <BsInfoCircle />
      <i>air-alarm 1.0.0 | Electron 17.1.0 | win32 10.0.19042</i>
    </div>
  );
};

export default AppInfo;
