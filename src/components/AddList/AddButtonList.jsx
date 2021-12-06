import React from "react";
import List from "../List/List";
import Badge from "../Badge/Badge";

import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import "./AddListButton.scss";

function AddButtonList({ colors, onAddList }) {
  const [visiblePopup, setVisiblePopup] = React.useState(true);
  const [coloric, setColor] = React.useState(colors[0].id);
  const [inputValue, setInputValue] = React.useState("");

  const changeValue = (e) => {
    return setInputValue(e.target.value);
  };
  const onClose = () => {
    setInputValue("");
    setVisiblePopup(!visiblePopup);
    setColor(colors[0].id);
  };
  const addList = (name) => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    const color = colors.filter((c) => c.id === coloric)[0].name;
    const newList = {};
    newList.id = Math.random();
    newList.name = name;
    newList.color = color;

    onAddList(newList);
    onClose();
  };

  return (
    <div className="add-list">
      <List
        onClick={
          visiblePopup === false
            ? () => setVisiblePopup(!visiblePopup)
            : () => setVisiblePopup(visiblePopup)
        }
        items={[
          {
            id: 6,
            icon: addSvg,
            name: "Добавить список",
            active: false,
            style: true,
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close-btn"
            className="add-list__popup-close-btn"
          />
          <input
            onChange={changeValue}
            value={inputValue}
            className="field"
            placeholder="Введите название"
          ></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setColor(color.id)}
                key={color.id}
                colors={color.name}
                className={coloric === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={() => addList(inputValue)} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButtonList;
