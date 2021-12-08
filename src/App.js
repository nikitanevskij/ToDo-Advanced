import React from "react";
import axios from "axios";

import List from "./components/List/List";
import Tasks from "./components/Tasks/Tasks";
import AddButtonList from "./components/AddList/AddButtonList";

import listSvg from "./assets/img/list.svg";

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeList, setActiveList] = React.useState(null);

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

  const onEditTitle = (title, id) => {
    const newLists = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ id: 5, icon: listSvg, name: "Все задачи", active: true }]}
        />
        {lists ? (
          <List
            items={lists}
            isRemovable
            onRemove={onRemove}
            activeList={(list) => setActiveList(list)}
            activeItem={activeList}
          />
        ) : (
          "...Загрузка"
        )}

        <AddButtonList color={colors} onAddList={onAddList} />
      </div>
      <div className="todo__tasks">
        {lists && activeList && (
          <Tasks list={activeList} onEditTitle={onEditTitle} />
        )}
      </div>
    </div>
  );
}

export default App;
