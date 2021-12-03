import React from "react";
import "./List.scss";
import classNames from "classnames";
import Badge from "../Badge/Badge.jsx";

function List({ items, onClick }) {
  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames({ active: item.active, opas: item.style })}
          >
            {item.icon ? (
              <i>
                <img src={item.icon} alt="listIcon" />
              </i>
            ) : (
              <Badge colors={item.color} />
            )}

            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
