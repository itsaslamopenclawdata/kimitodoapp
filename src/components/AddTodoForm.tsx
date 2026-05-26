'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

interface AddTodoFormProps {
  onAdd: (text: string) => Promise<void>
  isLoading?: boolean
}

export default function AddTodoForm({ onAdd, isLoading = false }: AddTodoFormProps) {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      await onAdd(input.trim())
      setInput('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
