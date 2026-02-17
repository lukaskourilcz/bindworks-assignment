import { categories } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const priority = searchParams.get("priority");
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(
    1,
    Math.min(100, Number(searchParams.get("limit")) || 20),
  );
  const start = (page - 1) * limit;

  let query = supabase.from("todos").select("*", { count: "exact" });

  if (category && category !== "all") query = query.eq("category", category);
  if (priority && priority !== "all") query = query.eq("priority", priority);
  if (status === "completed") query = query.eq("done", true);
  else if (status === "active") query = query.eq("done", false);
  if (search) query = query.ilike("text", `%${search}%`);

  query = query.range(start, start + limit - 1);

  const { data: todos, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = todos?.map((t) => ({
    ...t,
    dueDate: t.due_date,
    createdAt: t.created_at,
    completedAt: t.completed_at,
  }));

  const { data: allTodos } = await supabase
    .from("todos")
    .select("done, due_date");

  const total = allTodos?.length || 0;
  const completed = allTodos?.filter((t) => t.done).length || 0;
  const active = allTodos?.filter((t) => !t.done).length || 0;
  const overdue =
    allTodos?.filter(
      (t) => !t.done && t.due_date && new Date(t.due_date) < new Date(),
    ).length || 0;

  return NextResponse.json({
    todos: mapped,
    categories,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
    stats: { total, completed, active, overdue },
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

  const { data, error } = await supabase
    .from("todos")
    .insert({
      text: body.text.trim(),
      done: false,
      priority: body.priority || "medium",
      category: body.category || "other",
      due_date: body.dueDate || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = {
    ...data,
    dueDate: data.due_date,
    createdAt: data.created_at,
    completedAt: data.completed_at,
  };

  return NextResponse.json(mapped, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!body.id || typeof body.id !== "number") {
    return NextResponse.json(
      { error: "ID is required and must be a number" },
      { status: 400 },
    );
  }

  if (body.toggleDone) {
    const { data: existing } = await supabase
      .from("todos")
      .select("done")
      .eq("id", body.id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const newDone = !existing.done;
    const { data, error } = await supabase
      .from("todos")
      .update({
        done: newDone,
        completed_at: newDone ? new Date().toISOString() : null,
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mapped = {
      ...data,
      dueDate: data.due_date,
      createdAt: data.created_at,
      completedAt: data.completed_at,
    };

    return NextResponse.json(mapped);
  }

  const updates: Record<string, unknown> = {};
  if (body.text !== undefined) updates.text = body.text;
  if (body.priority !== undefined) updates.priority = body.priority;
  if (body.category !== undefined) updates.category = body.category;
  if (body.dueDate !== undefined) updates.due_date = body.dueDate;
  if (body.done !== undefined) {
    updates.done = body.done;
    updates.completed_at = body.done ? new Date().toISOString() : null;
  }

  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const mapped = {
    ...data,
    dueDate: data.due_date,
    createdAt: data.created_at,
    completedAt: data.completed_at,
  };

  return NextResponse.json(mapped);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id || isNaN(id)) {
    return NextResponse.json(
      { error: "ID is required and must be a number." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, deleted: data });
}
