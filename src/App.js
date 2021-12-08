import React from "react";
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import axios from "axios";

import AddButtonList from "./components/AddList/AddButtonList";
// import DB from "./assets/db.json";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);

  // DB.lists.map((item) => {
  //   item.color = DB.colors.filter(
  //     (colors) => colors.id === item.colorId
  //   )[0].name;

  //   return item;
  // })
  // );

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });

    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

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
        {lists ? (
          <List items={lists} isRemovable onRemove={onRemove} />
        ) : (
          "...Загрузка"
        )}

        <AddButtonList color={colors} onAddList={onAddList} />
      </div>
      <div className="todo__tasks">{lists && <Tasks list={lists[1]} />}</div>
    </div>
  );
}

export default App;
