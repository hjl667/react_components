import HouseIcon from "./houseIcon";
import { useState } from "react";
import "./animatedTab.css";
import React from "react";


const AnimatedTab = () => {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className="tabContainer"
      onMouseEnter={() => setOnHover(prev=>!prev)}
      onMouseLeave={() => setOnHover(prev=>!prev)}
    >
      <div className={onHover ? "hover" : ""}>
        <HouseIcon />
      </div>
      <div>great tab</div>
    </div>
  );
};

export default AnimatedTab;