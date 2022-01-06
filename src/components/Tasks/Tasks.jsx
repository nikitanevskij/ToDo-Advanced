import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

function Tasks({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemove,
  onEdit,
  onCompleteTask,
}) {
  const [visible, setVisible] = React.useState(true);

  const editTitle = () => {
    const newTitle = window.prompt("название списка", list.name);
    if (newTitle) {
      axios.patch("/lists/" + list.id, { name: newTitle }).catch(() => {
        alert("Не удалось отправить запрос");
      });
      onEditTitle(newTitle, list.id);
    }
  };

  const visibleNone = () => {
    setVisible(!visible);
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="edit" />
        </h2>
      </Link>
      <div className="tasks__items">
        {visible
          ? !withoutEmpty &&
            list.tasks &&
            !list.tasks.length && <h2>Задачи отсутствуют</h2>
          : " "}
        {list.tasks &&
          list.tasks.map((item) => (
            <Task
              key={item.id}
              item={item}
              onRemove={onRemove}
              onEdit={onEdit}
              list={list}
              onCompleteTask={onCompleteTask}
            />
          ))}

        <AddTaskForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
          visibleNone={visibleNone}
        />
      </div>
    </div>
  );
}

export default Tasks;
