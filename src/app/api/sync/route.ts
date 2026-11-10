import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DEFAULT_DATABASE } from "@/lib/defaultData";
import { AppDatabase } from "@/lib/types";

const DB_FILE_PATH = path.join(process.cwd(), "data", "database.json");

async function ensureDbFile(): Promise<AppDatabase> {
  try {
    const raw = await fs.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(raw) as AppDatabase;
  } catch {
    await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
    await fs.writeFile(
      DB_FILE_PATH,
      JSON.stringify(DEFAULT_DATABASE, null, 2),
      "utf-8"
    );
    return DEFAULT_DATABASE;
  }
}

export async function GET() {
  try {
    const db = await ensureDbFile();
    return NextResponse.json(db);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load database", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AppDatabase;
    const updated: AppDatabase = {
      ...body,
      updatedAt: new Date().toISOString(),
    };
    await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ ok: true, updatedAt: updated.updatedAt });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save database", details: String(err) },
      { status: 500 }
    );
  }
}
