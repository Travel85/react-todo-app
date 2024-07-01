import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

import styled from "styled-components";

export function TodoCard({
  title,
  done,
  id,
  todos,
  setTodos,
  category,
  date,
  filteredTodos,
  setFilteredTodos,
}) {
  const { catId } = useParams();

  //setCatId([useParams()]);
  //console.log(catId);

  //Rückgabe aller Todo außer, wenn der filter todo.id !== id;
  //(die id des iterierten todos ist genau die des angeklickten,
  // dann nicht zurückgeben) nicht zutrifft
  function handleDeleteOnClick() {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
    setFilteredTodos(
      filteredTodos.filter((todo) => {
        return todo.id !== id;
      })
    );
  }
  //die Callbackfunktion iteriert über die todos vergleicht die id
  //des iterierten Todo mit der des angeklickten todos und invertiert
  //den boolean wert von 'done' property. Zuletzt setzt der setter (setTodos)
  //den Zustand der Todos auf den neuen Wert (die Todos aber
  //mit dem einem Todo property 'done' auf den anderen Wert (bei true -> false)
  function handleToggleOnClick() {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    );
  }

  if (catId) {
    return (
      // Übergebe Styled Element property
      //Link zu todocard
      todos.map((todo) => {
        if (todo.id === catId)
          return (
            <StyledTodoContainer done={todo.done}>
              <TodoText done={todo.done}>{todo.title}</TodoText> - (
              {todo.category}) - ({date})
              <CiCircleCheck onClick={handleToggleOnClick} />
              <FaRegTrashAlt onClick={handleDeleteOnClick} />
            </StyledTodoContainer>
          );
      })
    );
  }
  return (
    <StyledTodoContainer done={done}>
      <TodoText done={done}>{title}</TodoText> - ({category}) - ({date})
      <CiCircleCheck onClick={handleToggleOnClick} />
      <FaRegTrashAlt onClick={handleDeleteOnClick} />
    </StyledTodoContainer>
  );
}

const TodoText = styled.p`
  display: inline;
  text-decoration-line: ${(props) => (props.done ? "line-through" : "none")};
`;

//Einem Styled Element kann man auch JS Code übergeben
//Hier wird einem anynonyme Funktion aufgerufen, welches auf das props Argument
//zugreift und per tenary operator den CSS - Wert setzt
const StyledTodoContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-color: #3f72af;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
  color: ${(props) => (props.done ? "grey" : "white")};
`;
