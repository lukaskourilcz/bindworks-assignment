"use client";

import { type Priority, type Category, type CategoryInfo } from "@/lib/types";

interface TodoFormProps {
  text: string;
  setText: (t: string) => void;
  priority: Priority;
  setPriority: (p: Priority) => void;
  category: Category;
  setCategory: (c: Category) => void;
  dueDate: string;
  setDueDate: (d: string) => void;
  categories: CategoryInfo[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TodoForm({
  text,
  setText,
  priority,
  setPriority,
  category,
  setCategory,
  dueDate,
  setDueDate,
  categories,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        autoFocus
      />
      <div className="flex flex-wrap gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-1 bg-violet-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-violet-500 disabled:opacity-50 transition-all"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5 transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
