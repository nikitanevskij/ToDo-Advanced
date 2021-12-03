import React from "react";
import List from "./components/List/List";
import listSvg from "./assets/img/list.svg";

import AddButtonList from "./components/AddList/AddButtonList";
import DB from "./assets/db.json";
function App() {
  const [menu, setMenu] = React.useState([
    { id: 0, color: "green", label: "Покупки", active: false },
    { id: 1, color: "blue", label: "Фронтенд", active: false },
    { id: 2, color: "pink", label: "Фильмы и сериалы", active: false },
    { id: 3, color: "yellow", label: "Книги", active: false },
    { id: 4, color: "green", label: "Личное", active: false },
  ]);

  // const addActive = (id) => {
  //   menu.map((item) => (item.active = false));
  //   const index = menu.map((task) => task.id).indexOf(id);
  //   menu[index].active = true;
  //   setMenu([...menu]);
  // };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ id: 5, icon: listSvg, label: "Все задачи", active: true }]}
        />
        <List items={menu} />
        <AddButtonList colors={DB.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
