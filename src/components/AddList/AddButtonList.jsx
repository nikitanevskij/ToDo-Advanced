import React from "react";
import List from "../List/List";
import Badge from "../Badge/Badge";

import axios from "axios";

import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import "./AddListButton.scss";

function AddButtonList({ color, onAddList }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [coloric, setColor] = React.useState(3);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(color)) {
      setColor(color[0].id);
    }
  }, [color]);

  const changeValue = (e) => {
    return setInputValue(e.target.value);
  };

  const onClose = () => {
    setInputValue("");
    setVisiblePopup(!visiblePopup);
    setColor(color[0].id);
  };

  const addList = (name) => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", { name: name, colorId: coloric })
      .then(({ data }) => {
        const col = color.filter((c) => c.id === coloric)[0].name;
        const listObj = { ...data, color: { name: col } };
        onAddList(listObj);

        onClose();
        setIsLoading(false);
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            {color.map((color) => (
              <Badge
                onClick={() => setColor(color.id)}
                key={color.id}
                colors={color.name}
                className={coloric === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={() => addList(inputValue)} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButtonList;
