import React from "react";
import "./Badge.scss";
import classNames from "classnames";
// {`badge badge--${colors}`}
function Badge({ colors, onClick, className }) {
  return (
    <>
      <i
        onClick={onClick}
        className={classNames(
          "badge",
          { [`badge--${colors}`]: colors },
          className
        )}
      ></i>
    </>
  );
}

export default Badge;
