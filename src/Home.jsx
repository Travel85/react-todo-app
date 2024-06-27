import "./App.css";
import { Input } from "./Input";
import { useState } from "react";
import { Fragment } from "react";
import { TodoCard } from "./TodoCard";
import { CategoryDropDown } from "./CategoryDropDown";

export function Home({
  todos,
  setTodos,
  filteredTodos,
  setFilteredTodos,
  filter,
  setFilter,
}) {
  return (
    <>
      <div className="app-container">
        <Input
          todos={todos}
          setTodos={setTodos}
          setFilter={setFilter}
          filter={filter}></Input>
        <CategoryDropDown
          todos={todos}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          filter={filter}></CategoryDropDown>
        {filteredTodos.length > 0
          ? filteredTodos.map((todo) => {
              return (
                <Fragment key={todo.id}>
                  <TodoCard
                    title={todo.title}
                    done={todo.done}
                    id={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    category={todo.category}
                    setFilteredTodos={setFilteredTodos}
                    filteredTodos={filteredTodos}
                  />
                </Fragment>
              );
            })
          : todos.map((todo) => {
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
            })}

        <div className="list-container"></div>
      </div>
    </>
  );
}
