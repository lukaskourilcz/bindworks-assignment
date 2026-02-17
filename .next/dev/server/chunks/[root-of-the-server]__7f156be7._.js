module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "todos",
    ()=>todos
]);
const categories = [
    {
        id: "personal",
        label: "Personal",
        color: "#8b5cf6"
    },
    {
        id: "work",
        label: "Work",
        color: "#3b82f6"
    },
    {
        id: "shopping",
        label: "Shopping",
        color: "#10b981"
    },
    {
        id: "health",
        label: "Health",
        color: "#ef4444"
    },
    {
        id: "other",
        label: "Other",
        color: "#6b7280"
    }
];
const todos = [
    {
        id: 1,
        text: "Complete project proposal",
        done: false,
        priority: "high",
        category: "work",
        dueDate: "2026-01-10",
        createdAt: "2026-01-05T10:00:00Z"
    },
    {
        id: 2,
        text: "Buy groceries",
        done: true,
        priority: "medium",
        category: "shopping",
        createdAt: "2026-01-04T08:00:00Z",
        completedAt: "2026-01-04T14:30:00Z"
    },
    {
        id: 3,
        text: "Schedule dentist appointment",
        done: false,
        priority: "low",
        category: "health",
        dueDate: "2026-01-15",
        createdAt: "2026-01-03T09:00:00Z"
    },
    {
        id: 4,
        text: "Review pull requests",
        done: false,
        priority: "high",
        category: "work",
        dueDate: "2026-01-08",
        createdAt: "2026-01-06T11:00:00Z"
    },
    {
        id: 5,
        text: "Call mom",
        done: false,
        priority: "medium",
        category: "personal",
        createdAt: "2026-01-06T12:00:00Z"
    }
];
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/todos/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const priority = searchParams.get("priority");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    let filtered = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"]
    ];
    if (category && category !== "all") {
        filtered = filtered.filter((t)=>t.category === category);
    }
    if (priority && priority !== "all") {
        filtered = filtered.filter((t)=>t.priority === priority);
    }
    if (status === "completed") {
        filtered = filtered.filter((t)=>t.done);
    } else if (status === "active") {
        filtered = filtered.filter((t)=>!t.done);
    }
    if (search) {
        filtered = filtered.filter((t)=>t.text.toLowerCase().includes(search.toLowerCase()));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        todos: filtered,
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["categories"],
        stats: {
            total: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].length,
            completed: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].filter((t)=>t.done).length,
            active: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].filter((t)=>!t.done).length,
            overdue: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].filter((t)=>!t.done && t.dueDate && new Date(t.dueDate) < new Date()).length
        }
    });
}
async function POST(request) {
    const body = await request.json();
    const newTodo = {
        id: Date.now(),
        text: body.text,
        done: false,
        priority: body.priority || "medium",
        category: body.category || "other",
        dueDate: body.dueDate,
        createdAt: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].push(newTodo);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newTodo);
}
async function PUT(request) {
    const body = await request.json();
    const todo = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].find((t)=>t.id === body.id);
    if (todo) {
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
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(todo || {});
}
async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const index = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].findIndex((t)=>t.id === id);
    if (index > -1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todos"].splice(index, 1);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7f156be7._.js.map