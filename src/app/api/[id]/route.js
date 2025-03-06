import db from "@/database/sqlite";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        db.prepare(`DELETE FROM tasks WHERE id = ?`).run(id);

        return NextResponse.json({message: "Tarefa excluida com sucesso"}, {status: 200})
    } catch(e) {
        return NextResponse.json({message: e.message}, {status: 500})
    }
}

export async function PUT(req, {params}) {
    try {
        const { id } = await params;
        const { completed } = await req.json();

        if(completed === undefined) return NextResponse.json({message: "Concluído é obrigatório"}, {status: 400})

        const numericId = Number(id);

        db.prepare(`UPDATE tasks SET completed = ? WHERE id = ?`).run(completed, numericId);
                
        return NextResponse.json({message: "Tarefa atualizada com sucesso"}, {status: 200})
    } catch(e) {
        return NextResponse.json({message: e.message}, {status: 500})
    }
}