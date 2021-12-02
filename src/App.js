import React from "react";
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";
import addSvg from "./assets/img/add.svg";

function App() {
  const [menu, setMenu] = React.useState([
    { id: 0, color: "green", label: "Покупки", active: false },
    { id: 1, color: "blue", label: "Фронтенд", active: false },
    { id: 2, color: "pink", label: "Фильмы и сериалы", active: false },
    { id: 3, color: "yellow", label: "Книги", active: false },
    { id: 4, color: "green", label: "Личное", active: false },
  ]);

  const addActive = (id) => {
    menu.map((item) => (item.active = false));
    const index = menu.map((task) => task.id).indexOf(id);
    menu[index].active = true;
    setMenu([...menu]);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ id: 5, icon: listSvg, label: "Все задачи", active: true }]}
          addActiveStyle={(id) => addActive(id)}
        />
        <List items={menu} addActiveStyle={(id) => addActive(id)} />
        <List
          items={[
            {
              id: 6,
              icon: addSvg,
              label: "Добавить список",
              active: false,
              style: true,
            },
          ]}
          addActiveStyle={(id) => addActive(id)}
        />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
