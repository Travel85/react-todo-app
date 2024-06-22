import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export function Input({ todos, setTodos }) {
  const todoNameRef = useRef();
  const categoryRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (todoNameRef.current.value !== "" && categoryRef.current.value !== "") {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: todoNameRef.current.value,
          category: categoryRef.current.value,
          done: false,
        },
      ]);
    }

    /*   console.log(categoryRef.current.value);
    console.log(todoNameRef.current.value);
 */
    todoNameRef.current.value = "";
    categoryRef.current.value = "";
  }

  function addItem() {
    if (todoNameRef.current.value !== "") {
      setTodos([
        ...todos,
        { id: uuidv4(), title: todoNameRef.current.value, done: false },
      ]);
      // localStorage.setItem(`todos`, JSON.stringify(todos));
    }
    // todoNameRef.current.value = "";
  }

  function addItemKeyPress(e) {
    if (e.code === "Enter") {
      addItem();
    }
  }
  /*   useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]); */

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter item: </label>
          <input
            type="text"
            name="text"
            id="text"
            ref={todoNameRef}
            onKeyDown={addItemKeyPress}
            required
          />
          <label htmlFor="text">Enter category: </label>
          <input
            type="text"
            name="category"
            id="category"
            ref={categoryRef}
            required
          />
          <button id="send">Send</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </>
  );
}
