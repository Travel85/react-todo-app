import { Fragment, useRef, useState } from "react";

export function CategoryDropDown({ todos, setTodos }) {
  //ein State verwenden und categories als array speichern
  //dann mit includes prüfen, ob es bereits vorhanden ist und dann erst hinzufügen
  const currentCategory = useRef();
  //const [todos, setTodos] = useState(storedTodos);
  const [categories, setCategories] = useState([]);

  function filterCategories() {
    console.log(todos);
    setCategories(
      todos.filter((todo) => {
        return todo.category === currentCategory.current.value;
      })
    );
    console.log(currentCategory.current.value);

    /*  console.log(currentCategory.current.value);
    if (currentCategory.current.value !== "") {
      setTodos(
        todos.filter((todo) => {
          return todo.category === currentCategory.current.value;
        })
      );
    } */
  }
  if (categories.length > 0) {
    return (
      <Fragment>
        <label htmlFor="category-choice">Choose a category:</label>
        <input
          list="categories"
          id="category-choice"
          name="category-choice"
          ref={currentCategory}
          onClick={filterCategories}
        />
        <datalist id="categories">
          {categories
            ? categories.map((todo) => {
                return <option key={todo.id} value={todo.category}></option>;
              })
            : null}
        </datalist>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <label htmlFor="category-choice">Choose a category:</label>
        <input
          list="categories"
          id="category-choice"
          name="category-choice"
          ref={currentCategory}
          onClick={filterCategories}
        />
        <datalist id="categories">
          {/*         <option value="Chocolate"></option>
          <option value="Coconut"></option>
          <option value="Mint"></option>
          <option value="Strawberry"></option>
          <option value="Vanilla"></option> */}

          {todos
            ? todos.map((todo) => {
                return <option key={todo.id} value={todo.category}></option>;
              })
            : null}
        </datalist>
      </Fragment>
    );
  }
}
