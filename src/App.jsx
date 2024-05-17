import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!title || !text) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    setTodos([...todos, { id: Date.now(), title, text, isDone: false }]);
    setTitle("");
    setText("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  return (
    <>
      <h1>ToDo리스트</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="제목을 입력해주세요!"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="내용을 입력해주세요!"
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit">등록</button>
      </form>
      <div className="todo-container">
        <div className="todo-section">
          <h2>Working!!</h2>
          <ul>
            {todos.filter(todo => !todo.isDone).map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-details">
                  <span className="todo-title">제목: {todo.title}</span>
                  <span className="todo-text">내용: {todo.text}</span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => toggleStatus(todo.id)}>완료</button>
                  <button onClick={() => removeTodo(todo.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="todo-section">
          <h2>Done!!</h2>
          <ul>
            {todos.filter(todo => todo.isDone).map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-details">
                  <span className="todo-title">제목: {todo.title}</span>
                  <span className="todo-text">내용: {todo.text}</span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => toggleStatus(todo.id)}>미완료</button>
                  <button onClick={() => removeTodo(todo.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
