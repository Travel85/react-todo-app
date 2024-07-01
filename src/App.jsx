import "./App.css";

import { useState } from "react";
import { Fragment } from "react";

import { Home } from "./Home";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { About } from "./pages/About.jsx";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { Interval } from "luxon";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TodoCard } from "./TodoCard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState([]);

  const notify = () => toast("Wow so easy!");
  //weiteren State anlegen mit filterTodos, dann darüber iterieren

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    checkDueDate(), [todos];
  });

  function checkDueDate() {
    //current date:
    const now = DateTime.now();

    /*         const inputDate = DateTime.fromISO(dueDateRef.current.value); */

    // Calculate the interval
    /*       const dueDate = Interval.fromDateTimes(now, inputDate);
        const parsedDueDate = Math.ceil(dueDate.length("days")); */

    // console.log(parsedDueDate);

    todos.map((todo) => {
      const inputDate = DateTime.fromISO(todo.date);
      const dueDate = Interval.fromDateTimes(now, inputDate);
      const parsedDueDate = Math.ceil(dueDate.length("days"));
      if (parsedDueDate <= 3) {
        console.log(`${todo.title} is due within ${parsedDueDate}`);
        toast(`${todo.title} is due within ${parsedDueDate}`);
      }
    });

    // const inputDate = DateTime.fromISO(dueDateRef.current.value).toRelative();
  }

  return (
    <Router>
      <Fragment>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
        <Link to={`/`}>
          <h1 className="header">My Todo App</h1>
        </Link>
        <ul>
          <Link to={`/`}>
            <li>Home</li>
          </Link>
          <Link to={`/about`}>
            <li>About</li>
          </Link>
        </ul>
      </Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              setTodos={setTodos}
              filteredTodos={filteredTodos}
              setFilteredTodos={setFilteredTodos}
              filter={filter}
              setFilter={setFilter}></Home>
          }></Route>
        <Route path="/:errorpage" element={<ErrorPage />}></Route>
        <Route path="/todo/:catId" element={<TodoCard todos={todos} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
