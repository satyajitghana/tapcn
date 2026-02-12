'use client';

import { useState } from 'react';
import { View } from 'react-native';

function Checkbox({ checked, onCheckedChange }: any) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
        checked ? 'bg-primary border-primary' : 'border-input'
      }`}
    >
      {checked && <span className="text-white text-xs">✓</span>}
    </button>
  );
}

function Input({ className, ...props }: any) {
  return <input className={`w-full px-3 py-2 border rounded-md ${className}`} {...props} />;
}

function Button({ children, className, ...props }: any) {
  return (
    <button className={`px-4 py-2 rounded-md font-medium ${className}`} {...props}>
      {children}
    </button>
  );
}

export function TodoBlock() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review pull requests', completed: true },
    { id: 3, text: 'Update documentation', completed: false },
    { id: 4, text: 'Schedule team meeting', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <View className="flex-1 bg-background">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Todo List</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeTodos.length} tasks remaining
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e: any) => setNewTodo(e.target.value)}
            onKeyPress={(e: any) => e.key === 'Enter' && addTodo()}
          />
          <Button
            onClick={addTodo}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add
          </Button>
        </div>

        {activeTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Active
            </h2>
            <div className="space-y-2">
              {activeTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-md border bg-card hover:bg-accent transition-colors"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className="flex-1">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Completed
            </h2>
            <div className="space-y-2">
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-md border bg-card hover:bg-accent transition-colors opacity-60"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className="flex-1 line-through">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </View>
  );
}
