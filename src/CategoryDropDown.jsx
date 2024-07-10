import { useRef } from "react";
import { Fragment } from "react";
import useTodos from "./customHools/useTodos";

export function CategoryDropDown() {
  const { todos, setFilteredTodos, filter } = useTodos();
  //ein State verwenden und categories als array speichern
  //dann mit includes prüfen, ob es bereits vorhanden ist und dann erst hinzufügen
  const currentCategory = useRef();
  //const [todos, setTodos] = useState(storedTodos);

  function filterCategories() {
    setFilteredTodos(
      todos.filter((todo) => {
        return todo.category === currentCategory.current.value;
      })
    );

    // console.log(categories);
    // console.log(currentCategory.current.value);

    /*  console.log(currentCategory.current.value);
    if (currentCategory.current.value !== "") {
      setTodos(
        todos.filter((todo) => {
          return todo.category === currentCategory.current.value;
        })
      );
    } */
  }
  function clearFilteredTodos() {
    setFilteredTodos([]);
    currentCategory.current.value = "";
  }
  return (
    <Fragment>
      <label htmlFor="category-choice">Choose a category:</label>
      <input
        list="categories"
        id="category-choice"
        name="category-choice"
        ref={currentCategory}
        onChange={filterCategories}
      />
      <button onClick={clearFilteredTodos}>Reset Filter</button>
      <datalist id="categories">
        {filter
          ? filter.map((filterItem) => {
              return (
                <Fragment>
                  <option value={filterItem}></option>;
                </Fragment>
              );
            })
          : null}
      </datalist>
    </Fragment>
  );
}
