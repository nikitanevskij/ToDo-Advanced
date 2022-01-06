import React from "react";
import classNames from "classnames";
import axios from "axios";
import Badge from "../Badge/Badge.jsx";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

function List({
  items,
  onClick,
  isRemovable,
  onRemove,
  activeList,
  activeItem,
}) {
  const removeList = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("/lists/" + id);
      onRemove(id);
    }
  };

  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames({
              active: item.active
                ? item.active
                : activeItem && activeItem.id === item.id,
              opas: item.style,
            })}
            onClick={() => activeList && activeList(item)}
          >
            {item.icon ? (
              <i>
                <img src={item.icon} alt="listIcon" />
              </i>
            ) : (
              <Badge colors={item.color.name} />
            )}

            <span>
              {item.name} {item.tasks && `(${item.tasks.length})`}
            </span>
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
