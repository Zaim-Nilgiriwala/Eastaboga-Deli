import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const items = await prisma.menuItem.findMany({
            orderBy: { id: 'asc' },
        });
        return Response.json(items);
    } catch (err) {
        console.error(err);
        return new Response("Error fetching menu", { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, image, category } = body;

        if (!name || price == null || !category) {
            return new Response("Missing required fields", { status: 400 });
        }

        const item = await prisma.menuItem.create({
            data: { name, price: Number(price), image, category },
        });

        return Response.json(item, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response("Error creating menu item", { status: 500 });
    }
}