'use client'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

interface TodoCounterProps {
  items: TodoItem[]
}

export default function TodoCounter({ items }: TodoCounterProps) {
  const incompleteCount = items.filter(item => !item.completed).length
  const totalCount = items.length

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 mt-4">
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-blue-600">{incompleteCount}</span> items left
      </div>
      <div className="text-sm text-gray-600">
        Total: <span className="font-semibold">{totalCount}</span>
      </div>
    </div>
  )
}
