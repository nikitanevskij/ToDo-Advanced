import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import List from "./components/List/List";
import Tasks from "./components/Tasks/Tasks";
import AddButtonList from "./components/AddList/AddButtonList";

import listSvg from "./assets/img/list.svg";

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeList, setActiveList] = React.useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    axios.get("h/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data);
    });

    axios.get("/colors").then(({ data }) => {
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

  const onAddTask = (listId, taskObj) => {
    const newLists = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
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

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу");
      });
    }
  };

  const onEdit = (listId, obj) => {
    const newTaskText = window.prompt("Текст задачи", obj.text);
    if (!newTaskText) {
      return;
    }

    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === obj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios.patch("/tasks/" + obj.id, { text: newTaskText }).catch(() => {
      alert("Не удалось удалить задачу");
    });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios.patch("/tasks/" + taskId, { completed: completed }).catch(() => {
      alert("Не удалось обновить задачу");
    });
  };

  React.useEffect(() => {
    const listId = location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveList(list);
    }
  }, [lists, location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          activeList={() => navigate("/")}
          items={[{ active: !activeList, icon: listSvg, name: "Все задачи" }]}
        />
        {lists ? (
          <List
            items={lists}
            isRemovable
            onRemove={onRemove}
            activeList={(list) => navigate("lists/" + list.id)}
            activeItem={activeList}
          />
        ) : (
          "...Загрузка"
        )}

        <AddButtonList color={colors} onAddList={onAddList} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            exact
            path="/"
            element={
              lists &&
              lists.map((item) => (
                <Tasks
                  key={item.id}
                  list={item}
                  onAddTask={onAddTask}
                  onEditTitle={onEditTitle}
                  onRemove={onRemoveTask}
                  onEdit={onEdit}
                  onCompleteTask={onCompleteTask}
                  withoutEmpty
                />
              ))
            }
          />
        </Routes>

        {lists && activeList && (
          <Tasks
            list={activeList}
            onAddTask={onAddTask}
            onEditTitle={onEditTitle}
            onRemove={onRemoveTask}
            onEdit={onEdit}
            onCompleteTask={onCompleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
