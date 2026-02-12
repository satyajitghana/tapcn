'use client';

import { useState } from 'react';
import { View } from 'react-native';

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
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeTodos.length} remaining
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <svg className="size-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        {/* Add task */}
        <div className="flex gap-2">
          <input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            className="flex h-10 flex-1 rounded-lg border border-border bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button
            onClick={addTodo}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Active */}
        {activeTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active
            </h2>
            <div className="space-y-2">
              {activeTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-border hover:border-primary transition-colors"
                  />
                  <span className="flex-1 text-sm">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completedTodos.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Completed
            </h2>
            <div className="space-y-2">
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 opacity-60"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary border-2 border-primary"
                  >
                    <svg className="size-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </button>
                  <span className="flex-1 text-sm line-through">{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
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
