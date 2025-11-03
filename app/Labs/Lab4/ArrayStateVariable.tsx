import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ArrayStateVariable() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement}
        id="wd-array-state-add">Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <span style={{ display: "inline-block", width: "40px" }}>{item}</span>
            <button
              onClick={() => deleteElement(index)}
              id="wd-array-state-delete">
              Delete</button>
          </li>))}
      </ul><hr />

      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />

    </div>);
}