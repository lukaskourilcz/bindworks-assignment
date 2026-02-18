"use client";

import {
  type Priority,
  type Category,
  type Todo,
  type CategoryInfo,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { StatsBar } from "./components/StatsBar";
import { TodoFilters } from "./components/TodoFilters";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

interface Stats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    active: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("other");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "completed"
  >("all");
  const [showFilters, setShowFilters] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTodos = async () => {
      try {
        const params = new URLSearchParams();
        if (filterCategory !== "all") params.set("category", filterCategory);
        if (filterPriority !== "all") params.set("priority", filterPriority);
        if (filterStatus !== "all") params.set("status", filterStatus);
        if (debouncedSearch) params.set("search", debouncedSearch);
        params.set("page", String(page));
        params.set("limit", "20");

        const res = await fetch(`/api/todos?${params}`, { signal });
        const data = await res.json();

        if (page === 1) {
          setTodos(data.todos);
        } else {
          setTodos((prev) => [...prev, ...data.todos]);
        }
        setCategories(data.categories);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchTodos();
    return () => {
      controller.abort();
    };
  }, [filterCategory, filterPriority, filterStatus, debouncedSearch, page]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [filterCategory, filterPriority, filterStatus, debouncedSearch]);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/login";
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const previousTodos = todos;
    const previousStats = stats;
    const savedText = text;
    const savedPriority = priority;
    const savedCategory = category;
    const savedDueDate = dueDate;

    const tempId = Date.now();
    const newTodo: Todo = {
      id: tempId,
      text,
      done: false,
      priority,
      category,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
    setDueDate("");
    setPriority("medium");
    setCategory("other");
    setShowForm(false);

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: savedText,
          priority: savedPriority,
          category: savedCategory,
          dueDate: savedDueDate || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const created = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === tempId ? created : t)));
      setStats((s) => ({ ...s, total: s.total + 1, active: s.active + 1 }));
    } catch (error) {
      console.error("Failed to add todo:", error);
      setTodos(previousTodos);
      setStats(previousStats);
      setText(savedText);
      setPriority(savedPriority);
      setCategory(savedCategory);
      setDueDate(savedDueDate);
      setShowForm(true);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const previousTodos = todos;
    const previousStats = stats;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              completedAt: !t.done ? new Date().toISOString() : undefined,
            }
          : t,
      ),
    );
    setStats((s) => ({
      ...s,
      completed: todo.done ? s.completed - 1 : s.completed + 1,
      active: todo.done ? s.active + 1 : s.active - 1,
    }));

    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleDone: true }),
      });
      if (!res.ok) throw new Error("Failed to toggle todo");
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      setTodos(previousTodos);
      setStats(previousStats);
    }
  };

  const deleteTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    const previousTodos = todos;
    const previousStats = stats;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (todo) {
      setStats((s) => ({
        ...s,
        total: s.total - 1,
        completed: todo.done ? s.completed - 1 : s.completed,
        active: !todo.done ? s.active - 1 : s.active,
      }));
    }

    try {
      const res = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
    } catch {
      setTodos(previousTodos);
      setStats(previousStats);
    }
  };

  const saveEdit = async (id: number) => {
    if (!editText.trim()) return;
    const previousTodos = todos;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editText } : t)),
    );
    setEditingId(null);

    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text: editText }),
      });
      if (!res.ok) throw new Error("Failed to save edit.");
    } catch (error) {
      console.error("Failed to save edit:", error);
      setTodos(previousTodos);
    }
  };

  const updateTodoPriority = async (id: number, newPriority: Priority) => {
    const previousTodos = todos;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: newPriority } : t)),
    );

    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, priority: newPriority }),
      });
      if (!res.ok) throw new Error("Failed to update Todo priority.");
    } catch {
      setTodos(previousTodos);
    }
  };

  const activeFiltersCount = [
    filterCategory !== "all",
    filterPriority !== "all",
    filterStatus !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="relative w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="glass-card rounded-2xl p-8">
          <Header onSignOut={handleSignOut} />

          {!loading && <StatsBar stats={stats} />}

          <TodoFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            showForm={showForm}
            setShowForm={setShowForm}
            categories={categories}
            activeFiltersCount={activeFiltersCount}
          />

          {showForm && (
            <TodoForm
              text={text}
              setText={setText}
              priority={priority}
              setPriority={setPriority}
              category={category}
              setCategory={setCategory}
              dueDate={dueDate}
              setDueDate={setDueDate}
              categories={categories}
              onSubmit={addTodo}
              onCancel={() => setShowForm(false)}
            />
          )}

          <TodoList
            todos={todos}
            categories={categories}
            loading={loading}
            activeFiltersCount={activeFiltersCount}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onStartEdit={(todo) => {
              setEditingId(todo.id);
              setEditText(todo.text);
            }}
            onSaveEdit={saveEdit}
            onCancelEdit={() => setEditingId(null)}
            onUpdatePriority={updateTodoPriority}
          />

          {!loading && page < totalPages && (
            <div className="text-right mb-4">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all"
              >
                Load more
              </button>
            </div>
          )}

          <div className="text-center text-xs text-muted-foreground/50">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
              Enter
            </kbd>{" "}
            to save edits
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <div className="inline-flex gap-2 text-[10px] text-muted-foreground font-mono bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <span>v3.0.0-beta</span>
            <span className="text-white/20">•</span>
            <span>Turbo-Pack</span>
            <span className="text-white/20">•</span>
            <span className="text-green-400">● Online</span>
          </div>
        </div>
      </div>
    </main>
  );
}
