import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("colorId is Require", { status: 400 });
    }

    const size = await prisma.size.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internet error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is Require", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is Require", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("colorId is Require", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prisma.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internet error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("colorId is Require", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prisma.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internet error", { status: 500 });
  }
}
