import React from "react";
import "./Tasks.scss";
import addSvg from "../../assets/img/add.svg";
import axios from "axios";

function AddTaskForm({ list, onAddTask, visibleNone }) {
  const [visibleForm, setVisibleForm] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const toggleVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
    visibleNone();
  };

  const changeValue = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toggleVisible();
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {visibleForm ? (
        <div onClick={toggleVisible} className="tasks__form-new">
          <img src={addSvg} alt="add" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            onChange={changeValue}
            value={inputValue}
            className="field"
            placeholder="Текст задачи"
          ></input>
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toggleVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
