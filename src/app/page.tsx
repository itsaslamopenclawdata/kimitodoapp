'use client'

import { useState, useCallback } from 'react'
import useSWR from 'swr'
import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'
import TodoCounter from '@/components/TodoCounter'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const { data: todos = [], mutate, isLoading } = useSWR<TodoItem[]>('/api/todos', fetcher)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAddTodo = useCallback(async (text: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (res.ok) {
        const newTodo = await res.json()
        mutate([...todos, newTodo], false)
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }, [todos, mutate])

  const handleToggleTodo = useCallback(async (id: string) => {
    setIsUpdating(true)
    try {
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      if (res.ok) {
        const updated = await res.json()
        mutate(
          todos.map(t => (t.id === id ? updated : t)),
          false
        )
      }
    } catch (error) {
      console.error('Error toggling todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }, [todos, mutate])

  const handleDeleteTodo = useCallback(async (id: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        mutate(todos.filter(t => t.id !== id), false)
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }, [todos, mutate])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">KimiTodo</h1>
          <p className="text-gray-600 mb-6">Manage your tasks efficiently</p>

          <AddTodoForm onAdd={handleAddTodo} isLoading={isUpdating} />

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : (
            <>
              <TodoList
                items={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                isLoading={isUpdating}
              />
              {todos.length > 0 && <TodoCounter items={todos} />}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
