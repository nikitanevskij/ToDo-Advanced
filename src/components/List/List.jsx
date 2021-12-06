import React from "react";
import classNames from "classnames";

import Badge from "../Badge/Badge.jsx";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

function List({ items, onClick, isRemovable, onRemove }) {
  const removeList = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      onRemove(id);
    }
  };
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

            <span>{item.name}</span>
            {isRemovable && (
              <img
                onClick={() => removeList(item.id)}
                className="list__remove-icon"
                src={removeSvg}
                alt="Remove icon"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
