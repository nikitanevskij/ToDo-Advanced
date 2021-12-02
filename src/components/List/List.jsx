import React from "react";
import "./List.scss";
import classNames from "classnames";

function List({ items, addActiveStyle }) {
  return (
    <div>
      <ul className="list">
        {items.map((item, index) => (
          <li
            onClick={() => addActiveStyle(item.id)}
            key={index}
            className={classNames({ active: item.active, opas: item.style })}
          >
            {item.icon ? (
              <i>
                <img src={item.icon} alt="listIcon" />
              </i>
            ) : (
              <i className={`badge badge--${item.color}`}></i>
            )}

            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
