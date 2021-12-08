import React from "react";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

function Tasks({ list }) {
  console.log(list);
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={editSvg} alt="edit" />
      </h2>
      <div className="tasks__items">
        {list.tasks.map((item) => (
          <div key={item.id} className="tasks__items-row">
            <div className="checkbox">
              <input type="checkbox" id={`task-${item.id}`}></input>
              <label htmlFor={`task-${item.id}`}>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={item.text} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
