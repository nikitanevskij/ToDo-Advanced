import React from "react";
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";

import AddButtonList from "./components/AddList/AddButtonList";
import DB from "./assets/db.json";

function App() {
  const [lists, setLists] = React.useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (colors) => colors.id === item.colorId
      )[0].name;

      return item;
    })
  );

  const onAddList = (obj) => {
    const newLists = [...lists, obj]; // так правильно, не делать push! не мутировать!
    setLists(newLists);
  };

  const onRemove = (id) => {
    const newLists = lists.filter((item) => item.id !== id);
    setLists(newLists);
  };
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ id: 5, icon: listSvg, name: "Все задачи", active: true }]}
        />
        <List items={lists} isRemovable onRemove={onRemove} />
        <AddButtonList colors={DB.colors} onAddList={onAddList} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
