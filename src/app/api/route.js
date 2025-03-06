import db from "@/database/sqlite";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, completed } = await req.json();

        if (!title) return NextResponse.json({ message: "Título é obrigatório" }, { status: 400 });

        const completedValue = completed ? 1 : 0;

        const query = `INSERT INTO tasks (title, completed) VALUES (?, ?)`;
        db.prepare(query).run(title, completedValue);

        return NextResponse.json({ message: "Tarefa criado com sucesso" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const query = `SELECT * FROM tasks`

        const tasks = db.prepare(query).all();

        return NextResponse.json(tasks);
    } catch(e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}