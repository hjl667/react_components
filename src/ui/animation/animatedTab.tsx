import HouseIcon from "./houseIcon";
import { useState } from "react";
import "./animatedTab.css";

const Title = () => {
  return <div>{"great tab"}</div>;
};

export default AnimatedTab = () => {
  [onHover, setOnHover] = useState(false);

  return (
    <div
      className="tabContainer"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className={onHover ? "hover" : ""}>
        <HouseIcon />
      </div>
      <Title />
    </div>
  );
};
