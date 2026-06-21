import { NextResponse } from "next/server";
import { getRandomParagraphs } from "@/lib/paragraph";

export async function GET() {
    const paragraph = getRandomParagraphs();
    return NextResponse.json(paragraph);
}