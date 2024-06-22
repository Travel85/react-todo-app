import "./App.css";
import { Input } from "./Input";
import { useState } from "react";
import { Fragment } from "react";
import { TodoCard } from "./TodoCard";
import { CategoryDropDown } from "./CategoryDropDown";

export function Home({ todos, setTodos }) {
  return (
    <>
      <div className="app-container">
        <Input todos={todos} setTodos={setTodos}></Input>
        <CategoryDropDown todos={todos}></CategoryDropDown>
        {todos
          ? todos.map((todo) => {
              return (
                <Fragment key={todo.id}>
                  <TodoCard
                    title={todo.title}
                    done={todo.done}
                    id={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    category={todo.category}
                  />
                </Fragment>
              );
            })
          : null}

        <div className="list-container"></div>
      </div>
    </>
  );
}