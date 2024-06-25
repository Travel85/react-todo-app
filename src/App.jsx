import "./App.css";

import { useState } from "react";
import { Fragment } from "react";

import { Home } from "./Home";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { About } from "./pages/About.jsx";

import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TodoCard } from "./TodoCard.jsx";

function App() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [filteredTodos, setFilteredTodos] = useState([]);
  //weiteren State anlegen mit filterTodos, dann darüber iterieren

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Fragment>
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
          element={<Home todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} ></Home>}></Route>
        <Route path="/:whatever" element={<ErrorPage />}></Route>
        <Route
          path="/todo/:catId"
          element={<TodoCard id={todos.category} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
