import { createContext, useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Interval } from "luxon";
import { toast } from "react-toastify";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);

  const checkDueDate = () => {
    //current date:
    const now = DateTime.now();

    todos.map((todo) => {
      const inputDate = DateTime.fromISO(todo.date);
      const dueDate = Interval.fromDateTimes(now, inputDate);
      const parsedDueDate = Math.ceil(dueDate.length("days"));
      if (parsedDueDate <= 3 && !todo.done) {
        // console.log(`${todo.title} is due within ${parsedDueDate} day(s)`);
        toast.warn(`${todo.title} is due within ${parsedDueDate} day(s)`);
      }
    });
  };

  useEffect(() => {
    checkDueDate();
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        filteredTodos,
        setFilteredTodos,
        checkDueDate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
