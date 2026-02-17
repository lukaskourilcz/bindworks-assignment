import { todos, Todo, categories } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const priority = searchParams.get("priority");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let filtered = [...todos];

  if (category && category !== "all") {
    filtered = filtered.filter((t) => t.category === category);
  }

  if (priority && priority !== "all") {
    filtered = filtered.filter((t) => t.priority === priority);
  }

  if (status === "completed") {
    filtered = filtered.filter((t) => t.done);
  } else if (status === "active") {
    filtered = filtered.filter((t) => !t.done);
  }

  if (search) {
    filtered = filtered.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(
    1,
    Math.min(100, Number(searchParams.get("limit")) || 20),
  );

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    todos: paginated,
    categories,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
    stats: {
      total: todos.length,
      completed: todos.filter((t) => t.done).length,
      active: todos.filter((t) => !t.done).length,
      overdue: todos.filter(
        (t) => !t.done && t.dueDate && new Date(t.dueDate) < new Date(),
      ).length,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (
    !body.text ||
    typeof body.text !== "string" ||
    body.text.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Text is required and must be a string." },
      { status: 400 },
    );
  }

  const newTodo: Todo = {
    id: Date.now(),
    text: body.text.trim(),
    done: false,
    priority: body.priority || "medium",
    category: body.category || "other",
    dueDate: body.dueDate,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!body.id || typeof body.id !== "number") {
    return NextResponse.json(
      { error: "ID is required and must be a number" },
      { status: 400 },
    );
  }

  const todo = todos.find((t) => t.id === body.id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  if (body.text !== undefined) todo.text = body.text;
  if (body.priority !== undefined) todo.priority = body.priority;
  if (body.category !== undefined) todo.category = body.category;
  if (body.dueDate !== undefined) todo.dueDate = body.dueDate;
  if (body.done !== undefined) {
    todo.done = body.done;
    todo.completedAt = body.done ? new Date().toISOString() : undefined;
  }
  if (body.toggleDone) {
    todo.done = !todo.done;
    todo.completedAt = todo.done ? new Date().toISOString() : undefined;
  }

  return NextResponse.json(todo);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { error: "ID is required and must be a number." },
      { status: 400 },
    );
  }

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  todos.splice(index, 1);

  return NextResponse.json({ success: true });
}
