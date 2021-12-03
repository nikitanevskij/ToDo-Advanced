import React from "react";
import List from "../List/List";
import addSvg from "../../assets/img/add.svg";
import "./AddListButton.scss";
import Badge from "../Badge/Badge";

function AddButtonList({ colors }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [coloric, setColor] = React.useState(null);

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            id: 6,
            icon: addSvg,
            label: "Добавить список",
            active: false,
            style: true,
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <input className="field" placeholder="Введите название"></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setColor(color.id)}
                key={color.id}
                colors={color.name}
                className={coloric === color.id ? "active" : ""}
              />
            ))}
          </div>
          <button className="button">Добавить</button>
        </div>
      )}
    </div>
  );
}

export default AddButtonList;
