import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!title || !text) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    setTodos([...todos, { id: Date.now(), title, text, status: "working" }]);
    setTitle("");
    setText("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === "working" ? "Done!" : "working" };
      }
      return todo;
    }));
  };

  const toggleIncomplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id && todo.status === "Done!") {
        return { ...todo, status: "working" };
      }
      return todo;
    }));
  };

  return (
    <>
      <h1>ToDo 리스트</h1>
      <form onSubmit={addTodo}>
        <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="내용" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">등록</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ marginRight: '10px' }}>제목: {todo.title}, 내용: {todo.text}</span>
              {todo.status === "Done!" ? (
                <>
                  <span style={{ color: 'green' }}>{todo.status}</span>
                  <button onClick={() => toggleIncomplete(todo.id)}>미완료</button>
                </>
              ) : (
                <button onClick={() => toggleStatus(todo.id)}>완료</button>
              )}
            </div>
            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
